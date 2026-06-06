import { Component, input } from '@angular/core';

import { TicketStatus } from '../../../../core/api-generated';
import { EnumTransformPipe } from '../../../../core/pipes/enum-transform-pipe';

@Component({
  selector: 'app-ticket-status-badge',
  imports: [EnumTransformPipe],
  templateUrl: './ticket-status-badge.html',
  styleUrl: './ticket-status-badge.css',
})
export class TicketStatusBadge {
  status = input.required<TicketStatus>();

  getBadgeColorClasses(): string {
    switch (this.status()) {
      case TicketStatus.OPEN:
        return 'bg-gray-400/10 text-gray-400 inset-ring-gray-400/20';
      case TicketStatus.ASSIGNED:
        return 'bg-blue-400/10 text-blue-400 inset-ring-blue-400/20';
      case TicketStatus.INPROGRESS:
        return 'bg-green-400/10 text-green-400 inset-ring-green-400/20';
      case TicketStatus.CLOSED:
        return 'bg-pink-400/10 text-pink-400 inset-ring-pink-400/20';
    }
  }
}
