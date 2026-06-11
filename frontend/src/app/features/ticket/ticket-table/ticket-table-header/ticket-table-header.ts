import { Component, input } from '@angular/core';

import { ChevronDown } from '../../../../common/icons/chevron-down';
import { ChevronUp } from '../../../../common/icons/chevron-up';

@Component({
  selector: 'app-ticket-table-header',
  templateUrl: './ticket-table-header.html',
  imports: [ChevronDown, ChevronUp],
})
export class TicketTableHeader {
  readonly headers = input.required<string[]>();
}
