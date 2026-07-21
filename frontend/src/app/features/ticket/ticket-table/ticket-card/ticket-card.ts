import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { TicketDto } from '../../../../core/api-generated';
import { TicketStatusBadge } from '../../_shared/ticket-status-badge/ticket-status-badge';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, TicketStatusBadge],
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  readonly ticket = input.required<TicketDto>();
}
