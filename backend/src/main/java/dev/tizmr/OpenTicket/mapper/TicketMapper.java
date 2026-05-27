package dev.tizmr.OpenTicket.mapper;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;

public interface TicketMapper {

  CreateTicketRequest fromDto(CreateTicketRequestDto dto);

  TicketDto toDto(Ticket ticket);
}
