package dev.tizmr.OpenTicket.service;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import java.util.List;

public interface TicketService {

  Ticket createTicket(CreateTicketRequest request);

  List<Ticket> listTickets();
}
