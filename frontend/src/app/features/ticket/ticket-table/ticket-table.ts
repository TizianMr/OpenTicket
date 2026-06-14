import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { TicketCard } from './ticket-card/ticket-card';
import { TicketTableEmpty } from './ticket-table-empty/ticket-table-empty';
import { TicketTableError } from './ticket-table-error/ticket-table-error';
import { TicketTableHeader } from './ticket-table-header/ticket-table-header';
import { TicketTableLoading } from './ticket-table-loading/ticket-table-loading';
import { TicketTablePagination } from './ticket-table-pagination/ticket-table-pagination';
import { TicketsService } from '../../../core/api-generated';
import { LoadingService } from '../../../core/services/loading-service';

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
})
export class TicketTable {
  private ticketService = inject(TicketsService);
  private loadingService = inject(LoadingService);

  protected readonly headers = ['Status', 'Title', 'Created at', 'Updated at'];

  protected page = signal(0);
  protected ticketResource = rxResource({
    params: () => ({ page: this.page(), size: PAGE_SIZE }),
    stream: ({ params }) => this.ticketService.listTickets(params.page, params.size),
  });

  protected readonly isLoading = this.loadingService.delayedLoading(this.ticketResource.isLoading);
  protected readonly isEmpty = computed(
    () => this.ticketResource.status() === 'resolved' && this.ticketResource.value()?.pageInfo.totalElements === 0,
  );

  onPageChange(newPage: number): void {
    this.page.set(newPage);
  }

  reload(): void {
    this.ticketResource.reload();
  }
}
