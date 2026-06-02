import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { TicketDto, TicketsService } from '../../../core/api-generated';

@Component({
  selector: 'app-ticket-table',
  imports: [DatePipe],
  templateUrl: './ticket-table.html',
  styleUrl: './ticket-table.css',
})
export class TicketTable implements OnInit {
  readonly headers = ['Title', 'Status', 'Created at', 'Updated at'];
  readonly tickets = signal<TicketDto[]>([]);

  private ticketService = inject(TicketsService);

  ngOnInit(): void {
    this.ticketService.listTickets().subscribe({
      next: response => {
        this.tickets.set(response.content);
      },
    });
  }
}
