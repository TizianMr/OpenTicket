import { Component, input, output } from '@angular/core';

import { Icon } from '../../../../common/icons/icon';
import { THead, SortDirection } from '../ticket-table.types';

@Component({
  selector: 'app-ticket-table-header',
  templateUrl: './ticket-table-header.html',
  imports: [Icon],
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
