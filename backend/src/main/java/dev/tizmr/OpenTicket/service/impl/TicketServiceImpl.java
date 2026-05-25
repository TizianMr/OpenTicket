package dev.tizmr.OpenTicket.service.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import dev.tizmr.OpenTicket.service.TicketService;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TicketServiceImpl implements TicketService {

  private final TicketRepository ticketRepository;

  public TicketServiceImpl(TicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  @Override
  public Ticket createTicket(CreateTicketRequest request) {
    Instant now = Instant.now();

    Ticket ticket = new Ticket(
      null,
      request.title(),
      request.description(),
      TicketStatus.OPEN,
      now,
      now
    );

    return ticketRepository.save(ticket);
  }
}
