import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { TicketTablePagination } from './ticket-table-pagination/ticket-table-pagination';
import { PagingResultTicketDto, TicketsService } from '../../../core/api-generated';
import { ModalService } from '../../../core/services/modal-service';

// TODO: move?
const PAGE_SIZE = 25;

@Component({
  selector: 'app-ticket-table',
  imports: [DatePipe, TicketTablePagination],
  templateUrl: './ticket-table.html',
  styleUrl: './ticket-table.css',
})
export class TicketTable implements OnInit {
  private ticketService = inject(TicketsService);
  private modalService = inject(ModalService);

  hasError = signal(false);
  isLoading = signal(false);

  protected readonly headers = ['Title', 'Status', 'Created at', 'Updated at'];

  readonly tableState = signal<PagingResultTicketDto | undefined>(undefined);
  isEmpty = computed(() => this.tableState()?.totalElements === 0);

  onPageChange(newPage: number): void {
    this.loadTickets(newPage);
  }

  onReloadPage(): void {
    window.location.reload();
  }

  onTicketCreate(): void {
    this.modalService.open('create-ticket');
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
