package dev.tizmr.OpenTicket.domain.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(enumAsRef = true)
public enum TicketStatus {
  OPEN,
  ASSIGNED,
  IN_PROGRESS,
  CLOSED
}
