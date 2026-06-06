import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-table-header',
  imports: [],
  templateUrl: './ticket-table-header.html',
})
export class TicketTableHeader {
  headers = input.required<string[]>();
}
