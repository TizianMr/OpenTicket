import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { TicketDto } from '../../../../core/api-generated';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  ticket = input.required<TicketDto>();
}
