import { Component, input, output } from '@angular/core';

import { SortAscending } from '../../../../common/icons/sort-asc';
import { SortDescending } from '../../../../common/icons/sort-desc';
import { SortIdle } from '../../../../common/icons/sort-idle';
import { THead, SortDirection } from '../ticket-table.types';

@Component({
  selector: 'app-ticket-table-header',
  templateUrl: './ticket-table-header.html',
  imports: [SortAscending, SortDescending, SortIdle],
})
export class TicketTableHeader {
  readonly headers = input.required<THead[]>();
  protected readonly sortDirection = SortDirection;

  sort = output<{ key: string; direction: SortDirection | undefined }>();

  onSort(headerKey: string): void {
    const currentSortDirection = this.headers().find(header => header.key === headerKey)?.sortDirection;
    let updatedSortDirection;

    switch (currentSortDirection) {
      case this.sortDirection.ASC:
        updatedSortDirection = this.sortDirection.DESC;
        break;
      case this.sortDirection.DESC:
        updatedSortDirection = undefined;
        break;
      default:
        updatedSortDirection = this.sortDirection.ASC;
    }

    this.sort.emit({ key: headerKey, direction: updatedSortDirection });
  }
}
