import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { TicketCard } from './ticket-card/ticket-card';
import { TicketTableEmpty } from './ticket-table-empty/ticket-table-empty';
import { TicketTableError } from './ticket-table-error/ticket-table-error';
import { TicketTableHeader } from './ticket-table-header/ticket-table-header';
import { TicketTableLoading } from './ticket-table-loading/ticket-table-loading';
import { TicketTablePagination } from './ticket-table-pagination/ticket-table-pagination';
import { PagingResultTicketDto, TicketsService } from '../../../core/api-generated';

// TODO: move?
const PAGE_SIZE = 15;

@Component({
  selector: 'app-ticket-table',
  imports: [
    TicketTablePagination,
    TicketTableHeader,
    TicketCard,
    TicketTableEmpty,
    TicketTableError,
    TicketTableLoading,
  ],
  templateUrl: './ticket-table.html',
  styleUrl: './ticket-table.css',
})
export class TicketTable implements OnInit {
  private ticketService = inject(TicketsService);

  hasError = signal(false);
  isLoading = signal(false);

  protected readonly headers = ['Status', 'Title', 'Created at', 'Updated at'];

  readonly tableState = signal<PagingResultTicketDto | undefined>(undefined);
  isEmpty = computed(() => this.tableState()?.totalElements === 0);

  onPageChange(newPage: number): void {
    this.loadTickets(newPage);
  }

  ngOnInit(): void {
    this.loadTickets(0);
  }

  private loadTickets(page: PagingResultTicketDto['page']): void {
    this.hasError.set(false);

    const spinnerTimer = setTimeout(() => this.isLoading.set(true), 500);

    this.ticketService.listTickets(page, PAGE_SIZE).subscribe({
      next: response => {
        this.tableState.set(response);
      },
      error: () => {
        clearTimeout(spinnerTimer);
        this.isLoading.set(false);
        this.hasError.set(true);
      },
      complete: () => {
        clearTimeout(spinnerTimer);
        this.isLoading.set(false);
      },
    });
  }
}
