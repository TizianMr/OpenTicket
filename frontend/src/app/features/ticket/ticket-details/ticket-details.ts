import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-ticket-details',
  imports: [],
  templateUrl: './ticket-details.html',
})
export class TicketDetails implements OnInit {
  ticketId = input.required<string>();
  readonly detailsClose = output<void>();

  handleClose(): void {
    this.detailsClose.emit();
  }

  ngOnInit(): void {
    // TODO: call getTicketById
    throw new Error('Method not implemented.');
  }
}
