import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { TicketDto } from '../../../../core/api-generated';
import { TicketStatusBadge } from '../ticket-status-badge/ticket-status-badge';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, TicketStatusBadge],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  ticket = input.required<TicketDto>();
}
