import { Component, signal } from '@angular/core';

import { DocumentPlus } from '../../common/icons/document-plus';
import { CreateTicket } from '../ticket/create-ticket/create-ticket';
import { TicketTable } from '../ticket/ticket-table/ticket-table';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTicket, TicketTable, DocumentPlus],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly modalOpen = signal(false);

  openModal(): void {
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }
}
