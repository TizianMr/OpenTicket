package dev.tizmr.OpenTicket.service.impl;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

  @Mock private TicketRepository ticketRepository;

  private TicketServiceImpl ticketService;
  private final Instant fixedInstant = Instant.parse("2026-06-14T14:30:12.858028057Z");
  private final Clock fixedClock = Clock.fixed(fixedInstant, ZoneOffset.UTC);

  @BeforeEach
  void setUp() {
    ticketService = new TicketServiceImpl(ticketRepository, fixedClock);
  }

  @Test
  void shouldSaveCorrectTicket() {
    CreateTicketRequest request = new CreateTicketRequest("Title", "Description");
    Ticket expectedTicket =
        new Ticket(null, "Title", "Description", TicketStatus.OPEN, fixedInstant, fixedInstant);

    ticketService.createTicket(request);

    verify(ticketRepository).save(eq(expectedTicket));
  }
}
