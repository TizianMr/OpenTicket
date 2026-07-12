package dev.tizmr.OpenTicket.exception;

import java.util.UUID;
import lombok.Getter;

@Getter
public class TicketNotFoundException extends RuntimeException {

  private final UUID id;

  public TicketNotFoundException(UUID id) {
    super(String.format("Ticket with ID %s does not exist.", id));
    this.id = id;
  }
}
