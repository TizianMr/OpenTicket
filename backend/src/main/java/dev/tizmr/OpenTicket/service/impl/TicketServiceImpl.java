package dev.tizmr.OpenTicket.service.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.TicketStatisticDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.exception.TicketNotFoundException;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import dev.tizmr.OpenTicket.service.TicketService;
import java.time.Clock;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;
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
  public Ticket getTicketById(UUID id) {
    return ticketRepository.findById(id).orElseThrow(() -> new TicketNotFoundException(id));
  }

  @Override
  public Page<Ticket> listTickets(Pageable pageable) {
    final Set<String> ALLOWED_SORT_FIELDS = Set.of("status", "title", "createdAt", "updatedAt");

    pageable
        .getSort()
        .forEach(
            order -> {
              if (!ALLOWED_SORT_FIELDS.contains(order.getProperty())) {
                throw new IllegalArgumentException(
                    "Invalid sort field: "
                        + order.getProperty()
                        + ". Allowed values are: "
                        + ALLOWED_SORT_FIELDS);
              }
            });

    return ticketRepository.findAll(pageable);
  }

  // TODO: take caching into account for future improvements
  @Override
  public TicketStatisticDto getStatistics() {
    final long open = ticketRepository.countByStatus(TicketStatus.OPEN);
    final long inProgress = ticketRepository.countByStatus(TicketStatus.IN_PROGRESS);
    final long closed = ticketRepository.countByStatus(TicketStatus.CLOSED);

    return new TicketStatisticDto(open, inProgress, closed);
  }
}
