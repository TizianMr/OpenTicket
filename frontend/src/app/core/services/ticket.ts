import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTicket, Ticket } from '../../models/Ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpClient = inject(HttpClient);

  createTicket(ticket: CreateTicket): Observable<Ticket> {
    console.log(ticket)
    return this.httpClient.post<Ticket>('tickets', ticket)
  }
}
