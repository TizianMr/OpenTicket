import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { TicketDto } from '../../../../core/api-generated';
import { TicketStatusBadge } from '../ticket-status-badge/ticket-status-badge';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, TicketStatusBadge],
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  protected readonly ticket = input.required<TicketDto>();
}
