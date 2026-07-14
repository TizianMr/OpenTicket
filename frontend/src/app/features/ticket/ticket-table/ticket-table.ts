import { Component, computed, inject, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { TicketCard } from './ticket-card/ticket-card';
import { TicketTableEmpty } from './ticket-table-empty/ticket-table-empty';
import { TicketTableError } from './ticket-table-error/ticket-table-error';
import { TicketTableHeader } from './ticket-table-header/ticket-table-header';
import { TicketTableLoading } from './ticket-table-loading/ticket-table-loading';
import { TicketTablePagination } from './ticket-table-pagination/ticket-table-pagination';
import { THead, SortDirection, PageSize } from './ticket-table.types';
import { TicketsService } from '../../../core/api-generated';
import { LoadingService } from '../../../core/services/loading-service';

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

  protected readonly ticketSelect = output<string>();

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

  tableState = signal<{ page: number; size: PageSize }>({ page: 0, size: 25 });
  ticketResource = rxResource({
    params: () => ({ page: this.tableState().page, size: this.tableState().size, sort: this.sortParams() }),
    stream: ({ params }) => this.ticketService.listTickets(params.page, params.size, params.sort),
  });

  protected readonly isLoading = this.loadingService.delayedLoading(this.ticketResource.isLoading);
  protected readonly isEmpty = computed(
    () => this.ticketResource.status() === 'resolved' && this.ticketResource.value()?.pageInfo.totalElements === 0,
  );

  onPageChange(newPage: number): void {
    this.tableState.update(state => ({ ...state, page: newPage }));
  }

  onSizeChange(newSize: PageSize): void {
    this.tableState.set({ page: 0, size: newSize });
  }

  onSort(headerKey: string, sortDirection: SortDirection | undefined): void {
    this.headers.update(headers => {
      return headers.map(h => {
        if (h.key === headerKey) {
          return { ...h, sortDirection };
        }
        return { ...h, sortDirection: undefined };
      });
    });
  }

  reload(): void {
    this.ticketResource.reload();
  }

  onTicketSelect(ticketId: string): void {
    this.ticketSelect.emit(ticketId);
  }
}
