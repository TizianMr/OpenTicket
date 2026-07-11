package dev.tizmr.OpenTicket.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.TicketStatisticDto;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
class TicketServiceImplTest {

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

  @Test
  void shouldThrowErrorOnInvalidSortField() {
    Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "test"));

    IllegalArgumentException thrown =
        assertThrows(IllegalArgumentException.class, () -> ticketService.listTickets(pageable));

    assertThat(thrown.getMessage()).contains("Invalid sort field: test");
  }

  @Test
  void shouldCallCountForTicketStatusAndReturnCorrectObject() {
    when(ticketRepository.countByStatus(TicketStatus.OPEN)).thenReturn(5L);
    when(ticketRepository.countByStatus(TicketStatus.CLOSED)).thenReturn(10L);
    when(ticketRepository.countByStatus(TicketStatus.IN_PROGRESS)).thenReturn(3L);

    TicketStatisticDto statisticDto = ticketService.getStatistics();

    verify(ticketRepository).countByStatus(TicketStatus.OPEN);
    verify(ticketRepository).countByStatus(TicketStatus.CLOSED);
    verify(ticketRepository).countByStatus(TicketStatus.IN_PROGRESS);

    assertThat(statisticDto.numOfOpenTickets()).isEqualTo(5L);
    assertThat(statisticDto.numOfInProgressTickets()).isEqualTo(3L);
    assertThat(statisticDto.numOfClosedTickets()).isEqualTo(10L);
  }
}
