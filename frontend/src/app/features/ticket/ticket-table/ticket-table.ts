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

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
export interface THead {
  readonly label: string;
  readonly key: string;
  sortDirection?: SortDirection;
}

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

  protected readonly headers = signal<THead[]>([
    { label: 'Status', key: 'status', sortDirection: undefined },
    { label: 'Title', key: 'title', sortDirection: undefined },
    { label: 'Created at', key: 'createdAt', sortDirection: undefined },
    { label: 'Updated at', key: 'updatedAt', sortDirection: undefined },
  ]);

  private sortParams = computed(() => {
    const activeSort = this.headers().find(header => header.sortDirection !== undefined);
    return activeSort ? [`${activeSort.key},${activeSort.sortDirection}`] : [''];
  });

  protected page = signal(0);
  protected ticketResource = rxResource({
    params: () => ({ page: this.page(), size: PAGE_SIZE, sort: this.sortParams() }),
    stream: ({ params }) => this.ticketService.listTickets(params.page, params.size, params.sort),
  });

  protected readonly isLoading = this.loadingService.delayedLoading(this.ticketResource.isLoading);
  protected readonly isEmpty = computed(
    () => this.ticketResource.status() === 'resolved' && this.ticketResource.value()?.pageInfo.totalElements === 0,
  );

  onPageChange(newPage: number): void {
    this.page.set(newPage);
  }

  onSort(headerKey: string, sortDirection: SortDirection): void {
    this.headers.update(headers => {
      return headers.map(h => {
        if (h.key === headerKey && h.sortDirection !== sortDirection) {
          return { ...h, sortDirection };
        }
        return { ...h, sortDirection: undefined };
      });
    });
  }

  reload(): void {
    this.ticketResource.reload();
  }
}
