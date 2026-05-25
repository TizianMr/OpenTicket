package dev.tizmr.OpenTicket.domain.dto;

import dev.tizmr.OpenTicket.domain.entity.TicketStatus;

import java.time.Instant;
import java.util.UUID;

public record TicketDto(
  UUID id,
  String title,
  String description,
  TicketStatus status,
  Instant createdAt,
  Instant updatedAt
) {
}
