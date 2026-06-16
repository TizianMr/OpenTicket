import { Component, input, output } from '@angular/core';

import { ChevronDown } from '../../../../common/icons/chevron-down';
import { ChevronUp } from '../../../../common/icons/chevron-up';
import { SortDirection, THead } from '../ticket-table';

@Component({
  selector: 'app-ticket-table-header',
  templateUrl: './ticket-table-header.html',
  imports: [ChevronDown, ChevronUp],
})
export class TicketTableHeader {
  readonly headers = input.required<THead[]>();
  protected readonly sortDirection = SortDirection;

  sort = output<[string, SortDirection]>();

  onSort(headerKey: string, sortDirection: SortDirection): void {
    this.sort.emit([headerKey, sortDirection]);
  }
}
