import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateTicket, Ticket } from '../../models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpClient = inject(HttpClient);

  createTicket(ticket: CreateTicket): Observable<Ticket> {
    return this.httpClient.post<Ticket>('tickets', ticket);
  }
}
