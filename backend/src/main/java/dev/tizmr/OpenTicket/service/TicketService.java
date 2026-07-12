package dev.tizmr.OpenTicket.service;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.TicketStatisticDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketService {

  Ticket createTicket(CreateTicketRequest request);

  Ticket getTicketById(UUID id);

  Page<Ticket> listTickets(Pageable pageable);

  TicketStatisticDto getStatistics();
}
