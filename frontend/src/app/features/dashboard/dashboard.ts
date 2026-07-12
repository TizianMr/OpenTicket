import { Component, inject } from '@angular/core';

import { Icon } from '../../common/icons/icon';
import { ModalDirective } from '../../core/directives/modal-directive';
import { ModalService } from '../../core/services/modal-service';
import { CreateTicket } from '../ticket/create-ticket/create-ticket';
import { TicketStatistic } from '../ticket/ticket-statistic/ticket-statistic';
import { TicketTable } from '../ticket/ticket-table/ticket-table';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTicket, TicketTable, ModalDirective, TicketStatistic, Icon],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly modalService = inject(ModalService);
}
