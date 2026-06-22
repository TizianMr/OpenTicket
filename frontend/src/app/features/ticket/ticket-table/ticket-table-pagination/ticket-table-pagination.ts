import { Component, computed, input, output } from '@angular/core';

import { ChevronLeft } from '../../../../common/icons/chevron-left';
import { ChevronLeftDouble } from '../../../../common/icons/chevron-left-double';
import { ChevronRight } from '../../../../common/icons/chevron-right';
import { ChevronRightDouble } from '../../../../common/icons/chevron-right-double';
import { PageInfo } from '../../../../core/api-generated';
import { PageSize } from '../ticket-table.types';

@Component({
  selector: 'app-ticket-table-pagination',
  imports: [ChevronLeftDouble, ChevronLeft, ChevronRight, ChevronRightDouble],
  templateUrl: './ticket-table-pagination.html',
})
export class TicketTablePagination {
  readonly paginationState = input.required<PageInfo>();
  readonly pageChange = output<number>();
  readonly sizeChange = output<PageSize>();

  protected readonly pageSizeOptions: PageSize[] = [5, 10, 25, 50] as const;

  readonly isLastPage = computed(() => this.paginationState().page === this.paginationState().totalPages - 1);
  readonly isFirstPage = computed(() => this.paginationState().page === 0);
  readonly tableInfo = computed(() => ({
    min: this.paginationState().totalElements === 0 ? 0 : this.paginationState().page * this.paginationState().size + 1,
    max: Math.min(
      this.paginationState().totalElements,
      (this.paginationState().page + 1) * this.paginationState().size,
    ),
    total: this.paginationState().totalElements,
  }));

  onForwardClick(): void {
    this.pageChange.emit(this.paginationState().page + 1);
  }

  onBackwardsClick(): void {
    this.pageChange.emit(this.paginationState().page - 1);
  }

  onFirstPageClick(): void {
    this.pageChange.emit(0);
  }

  onLastPageClick(): void {
    this.pageChange.emit(this.paginationState().totalPages - 1);
  }

  onSizeChange(event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.sizeChange.emit(Number(size) as PageSize);
  }
}
