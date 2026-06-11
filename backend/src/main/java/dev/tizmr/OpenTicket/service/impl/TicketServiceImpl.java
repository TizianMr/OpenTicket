package dev.tizmr.OpenTicket.service.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import dev.tizmr.OpenTicket.service.TicketService;
import java.time.Clock;
import java.time.Instant;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {

  private final TicketRepository ticketRepository;
  private final Clock clock;

  public TicketServiceImpl(TicketRepository ticketRepository, Clock clock) {
    this.ticketRepository = ticketRepository;
    this.clock = clock;
  }

  @Override
  public Ticket createTicket(CreateTicketRequest request) {
    final Instant now = Instant.now(clock);

    final Ticket ticket =
        new Ticket(null, request.title(), request.description(), TicketStatus.OPEN, now, now);

    return ticketRepository.save(ticket);
  }

  @Override
  public Page<Ticket> listTickets(Pageable pageable) {
    final Set<String> ALLOWED_SORT_FIELDS = Set.of("status", "title", "createdAt", "updatedAt");

    pageable.getSort().forEach(order -> {
      if (!ALLOWED_SORT_FIELDS.contains(order.getProperty())) {
        throw new IllegalArgumentException("Invalid sort field: " + order.getProperty() + ". Allowed values are: " + ALLOWED_SORT_FIELDS);
      }
    });

    return ticketRepository.findAll(pageable);
  }
}
