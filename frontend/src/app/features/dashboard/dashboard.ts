import { Component, inject } from '@angular/core';

import { CircleCheck } from '../../common/icons/circle-check';
import { CircleHalf } from '../../common/icons/circle-half';
import { DocumentPlus } from '../../common/icons/document-plus';
import { InProgress } from '../../common/icons/in-progress';
import { ModalDirective } from '../../core/directives/modal-directive';
import { ModalService } from '../../core/services/modal-service';
import { CreateTicket } from '../ticket/create-ticket/create-ticket';
import { TicketTable } from '../ticket/ticket-table/ticket-table';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTicket, TicketTable, DocumentPlus, ModalDirective, InProgress, CircleCheck, CircleHalf],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly modalService = inject(ModalService);
}
