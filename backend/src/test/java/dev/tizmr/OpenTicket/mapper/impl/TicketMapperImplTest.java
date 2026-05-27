package dev.tizmr.OpenTicket.mapper.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class TicketMapperImplTest {

  private final TicketMapperImpl ticketMapper = new TicketMapperImpl();

  @Test
  void shouldMapFromDto() {
    CreateTicketRequestDto dto =
        new CreateTicketRequestDto("Login bug", "Users cannot log in on mobile");

    CreateTicketRequest result = ticketMapper.fromDto(dto);

    assertEquals("Login bug", result.title());
    assertEquals("Users cannot log in on mobile", result.description());
  }

  @Test
  void shouldMapToDto() {
    Ticket ticket =
        new Ticket(
            UUID.randomUUID(),
            "Login bug",
            "Users cannot log in on mobile",
            TicketStatus.OPEN,
            Instant.now(),
            Instant.now());

    TicketDto result = ticketMapper.toDto(ticket);

    assertEquals(ticket.getId(), result.id());
    assertEquals(ticket.getTitle(), result.title());
    assertEquals(ticket.getDescription(), result.description());
    assertEquals(ticket.getStatus(), result.status());
    assertEquals(ticket.getCreatedAt(), result.createdAt());
    assertEquals(ticket.getUpdatedAt(), result.updatedAt());
  }
}
