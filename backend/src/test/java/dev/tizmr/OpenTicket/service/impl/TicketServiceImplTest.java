package dev.tizmr.OpenTicket.service.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.repository.TicketRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

  @Mock
  private TicketRepository ticketRepository;

  @InjectMocks
  private TicketServiceImpl ticketService;

  @Test
  void shouldCreateTicketWithCorrectFields() {
    CreateTicketRequest request = new CreateTicketRequest("Title", "Description");

    Ticket savedTicket = new Ticket(UUID.randomUUID(), "Title", "Description", TicketStatus.OPEN, Instant.now(), Instant.now());
    when(ticketRepository.save(any(Ticket.class))).thenReturn(savedTicket);

    Ticket result = ticketService.createTicket(request);

    assertThat(result.getTitle()).isEqualTo("Title");
    assertThat(result.getDescription()).isEqualTo("Description");
    assertThat(result.getStatus()).isEqualTo(TicketStatus.OPEN);
    assertThat(result.getId()).isNotNull();
  }
}
