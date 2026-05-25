package dev.tizmr.OpenTicket.service;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;

public interface TicketService {

  Ticket createTicket(CreateTicketRequest request);
}
