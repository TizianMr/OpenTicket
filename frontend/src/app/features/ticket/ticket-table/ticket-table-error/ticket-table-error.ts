import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-table-error',
  imports: [],
  templateUrl: './ticket-table-error.html',
})
export class TicketTableError {
  onReloadPage(): void {
    window.location.reload();
  }
}
