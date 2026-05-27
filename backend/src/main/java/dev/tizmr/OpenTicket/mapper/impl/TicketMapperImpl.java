package dev.tizmr.OpenTicket.mapper.impl;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.mapper.TicketMapper;
import org.springframework.stereotype.Component;

@Component
public class TicketMapperImpl implements TicketMapper {

  @Override
  public CreateTicketRequest fromDto(CreateTicketRequestDto dto) {
    return new CreateTicketRequest(dto.title(), dto.description());
  }

  @Override
  public TicketDto toDto(Ticket ticket) {
    return new TicketDto(
        ticket.getId(),
        ticket.getTitle(),
        ticket.getDescription(),
        ticket.getStatus(),
        ticket.getCreatedAt(),
        ticket.getUpdatedAt());
  }
}
