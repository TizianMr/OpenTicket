package dev.tizmr.OpenTicket.service.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import dev.tizmr.OpenTicket.service.TicketService;
import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {

  private final TicketRepository ticketRepository;

  public TicketServiceImpl(TicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  @Override
  public Ticket createTicket(CreateTicketRequest request) {
    final Instant now = Instant.now();

    final Ticket ticket =
        new Ticket(null, request.title(), request.description(), TicketStatus.OPEN, now, now);

    return ticketRepository.save(ticket);
  }

  @Override
  public Page<Ticket> listTickets(Pageable pageable) {
    return ticketRepository.findAll(pageable);
  }
}
