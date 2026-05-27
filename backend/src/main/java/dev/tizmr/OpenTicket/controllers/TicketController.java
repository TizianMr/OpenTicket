package dev.tizmr.OpenTicket.controllers;

import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.mapper.TicketMapper;
import dev.tizmr.OpenTicket.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/tickets")
public class TicketController {

  private final TicketService ticketService;
  private final TicketMapper ticketMapper;

  public TicketController(TicketService ticketService, TicketMapper ticketMapper) {
    this.ticketService = ticketService;
    this.ticketMapper = ticketMapper;
  }

  @PostMapping
  public ResponseEntity<TicketDto> createTicket(
      @Valid @RequestBody CreateTicketRequestDto createTicketRequestDto) {
    final Ticket created = ticketService.createTicket(ticketMapper.fromDto(createTicketRequestDto));
    return new ResponseEntity<>(ticketMapper.toDto(created), HttpStatus.CREATED);
  }
}
