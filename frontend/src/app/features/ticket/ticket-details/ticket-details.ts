import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { TicketDto } from '../../../core/api-generated';
import { TicketStatusBadge } from '../ticket-table/ticket-status-badge/ticket-status-badge';

@Component({
  selector: 'app-ticket-details',
  imports: [DatePipe, TicketStatusBadge],
  templateUrl: './ticket-details.html',
  host: {
    display: 'block',
  },
})
export class TicketDetails {
  ticket = input.required<TicketDto>();
  readonly detailsClose = output<void>();

  handleClose(): void {
    this.detailsClose.emit();
  }

  onOverlayClick(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Escape') {
        this.detailsClose.emit();
      }
      return;
    }

    if (event.target === event.currentTarget) {
      this.detailsClose.emit();
    }
  }
}
