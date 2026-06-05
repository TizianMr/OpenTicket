import { Component, inject } from '@angular/core';

import { ModalService } from '../../../../core/services/modal-service';
import { CreateTicket } from '../../create-ticket/create-ticket';

@Component({
  selector: 'app-ticket-table-empty',
  imports: [CreateTicket],
  templateUrl: './ticket-table-empty.html',
  styleUrl: './ticket-table-empty.css',
})
export class TicketTableEmpty {
  protected readonly modalService = inject(ModalService);
}
