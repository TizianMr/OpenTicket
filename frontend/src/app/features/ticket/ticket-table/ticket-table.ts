import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { TicketTablePagination } from './ticket-table-pagination/ticket-table-pagination';
import { PagingResultTicketDto, TicketsService } from '../../../core/api-generated';
import { CreateTicket } from '../create-ticket/create-ticket';

@Component({
  selector: 'app-ticket-table',
  imports: [DatePipe, CreateTicket, TicketTablePagination],
  templateUrl: './ticket-table.html',
  styleUrl: './ticket-table.css',
})
export class TicketTable implements OnInit {
  // TODO: move elsewhere? - modal service?
  readonly modalOpen = signal(false);

  openModal(): void {
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  private ticketService = inject(TicketsService);

  protected readonly headers = ['Title', 'Status', 'Created at', 'Updated at'];

  readonly tableState = signal<PagingResultTicketDto>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 5,
    page: 0,
  });

  onPageChange(newPage: number): void {
    this.loadTickets(newPage);
  }

  ngOnInit(): void {
    this.loadTickets(this.tableState().page);
  }

  private loadTickets(page: PagingResultTicketDto['page']): void {
    this.ticketService.listTickets(page, this.tableState().size).subscribe({
      next: response => {
        this.tableState.set(response);
      },
    });
  }
}
