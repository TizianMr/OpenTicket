import { Component, computed, input, output } from '@angular/core';

import { ChevronLeft } from '../../../../common/icons/chevron-left';
import { ChevronLeftDouble } from '../../../../common/icons/chevron-left-double';
import { ChevronRight } from '../../../../common/icons/chevron-right';
import { ChevronRightDouble } from '../../../../common/icons/chevron-right-double';
import { PagingResultTicketDto } from '../../../../core/api-generated';

@Component({
  selector: 'app-ticket-table-pagination',
  imports: [ChevronLeftDouble, ChevronLeft, ChevronRight, ChevronRightDouble],
  templateUrl: './ticket-table-pagination.html',
})
export class TicketTablePagination {
  readonly paginationState = input.required<Omit<PagingResultTicketDto, 'content'>>();
  readonly pageChange = output<number>();

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
}
