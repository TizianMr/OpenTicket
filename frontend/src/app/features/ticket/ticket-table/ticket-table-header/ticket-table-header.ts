import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-table-header',
  templateUrl: './ticket-table-header.html',
})
export class TicketTableHeader {
  readonly headers = input.required<string[]>();
}
