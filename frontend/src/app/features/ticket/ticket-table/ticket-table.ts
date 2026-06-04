import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { ChevronLeft } from '../../../common/icons/chevron-left';
import { ChevronLeftDouble } from '../../../common/icons/chevron-left-double';
import { ChevronRight } from '../../../common/icons/chevron-right';
import { ChevronRightDouble } from '../../../common/icons/chevron-right-double';
import { PagingResultTicketDto, TicketsService } from '../../../core/api-generated';
import { CreateTicket } from '../create-ticket/create-ticket';

@Component({
  selector: 'app-ticket-table',
  imports: [DatePipe, CreateTicket, ChevronLeft, ChevronRight, ChevronRightDouble, ChevronLeftDouble],
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
  readonly isLastPage = computed(() => this.tableState().page === this.tableState().totalPages - 1);
  readonly isFirstPage = computed(() => this.tableState().page === 0);
  readonly tableInfo = computed(() => ({
    min: this.tableState().totalElements === 0 ? 0 : this.tableState().page * this.tableState().size + 1,
    max: Math.min(this.tableState().totalElements, (this.tableState().page + 1) * this.tableState().size),
    total: this.tableState().totalElements,
  }));

  onPageForwardClick(): void {
    this.loadTickets(this.tableState().page + 1);
  }

  onPageBackwardsClick(): void {
    this.loadTickets(this.tableState().page - 1);
  }

  onFirstPageClick(): void {
    this.loadTickets(0);
  }

  onLastPageClick(): void {
    this.loadTickets(this.tableState().totalPages - 1);
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
