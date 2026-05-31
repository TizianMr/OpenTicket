package dev.tizmr.OpenTicket.controllers;

import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.ErrorDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.mapper.TicketMapper;
import dev.tizmr.OpenTicket.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/")
@Tag(name = "Ticket", description = "Ticket related endpoints")
@RestController
@RequestMapping(path = "api/v1/tickets")
public class TicketController {

  private final TicketService ticketService;
  private final TicketMapper ticketMapper;

  public TicketController(TicketService ticketService, TicketMapper ticketMapper) {
    this.ticketService = ticketService;
    this.ticketMapper = ticketMapper;
  }

  @Operation(summary = "Create a ticket")
  @ApiResponses({
    @ApiResponse(responseCode = "201", description = "User created", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDto.class))),
    @ApiResponse(
        responseCode = "400",
        description = "Validation failed",
        content =
            @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorDto.class)))
  })
  @PostMapping
  public ResponseEntity<TicketDto> createTicket(
      @Valid @RequestBody CreateTicketRequestDto createTicketRequestDto) {
    final Ticket created = ticketService.createTicket(ticketMapper.fromDto(createTicketRequestDto));
    return new ResponseEntity<>(ticketMapper.toDto(created), HttpStatus.CREATED);
  }
}
