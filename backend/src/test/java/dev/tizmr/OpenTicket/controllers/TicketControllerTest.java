package dev.tizmr.OpenTicket.controllers;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.mapper.TicketMapper;
import dev.tizmr.OpenTicket.service.TicketService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.json.JsonMapper;

import java.time.Instant;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TicketController.class)
class TicketControllerTest {

  @MockitoBean
  private TicketService ticketService;

  @MockitoBean
  private TicketMapper ticketMapper;

  @Autowired
  private MockMvc mockMvc;

  JsonMapper mapper = JsonMapper.builder().build();

  @Test
  void shouldReturnCreatedTicket() throws Exception {
    Instant now = Instant.now();
    CreateTicketRequestDto request = new CreateTicketRequestDto("Title", "Description");

    Ticket mockTicket = new Ticket();
    mockTicket.setTitle("Title");

    TicketDto mockDto = new TicketDto(UUID.randomUUID(), "Title", "Description", TicketStatus.OPEN, now, now);

    when(ticketMapper.fromDto(any(CreateTicketRequestDto.class))).thenReturn(new CreateTicketRequest("Title", "Description"));
    when(ticketService.createTicket(any(CreateTicketRequest.class))).thenReturn(mockTicket);
    when(ticketMapper.toDto(any(Ticket.class))).thenReturn(mockDto);

    mockMvc.perform(post("/api/v1/tickets")
        .contentType(MediaType.APPLICATION_JSON)
        .content(mapper.writeValueAsString(request)))
      .andDo(print())
      .andExpect(status().isCreated())
      .andExpect(jsonPath("$.title").value("Title"))
      .andExpect(jsonPath("$.description").value("Description"))
      .andExpect(jsonPath("$.status").value("OPEN"));;

  }
}
