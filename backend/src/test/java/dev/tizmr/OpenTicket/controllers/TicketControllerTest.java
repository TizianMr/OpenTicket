package dev.tizmr.OpenTicket.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.tizmr.OpenTicket.domain.CreateTicketRequest;
import dev.tizmr.OpenTicket.domain.dto.CreateTicketRequestDto;
import dev.tizmr.OpenTicket.domain.dto.TicketDto;
import dev.tizmr.OpenTicket.domain.entity.Ticket;
import dev.tizmr.OpenTicket.domain.entity.TicketStatus;
import dev.tizmr.OpenTicket.mapper.TicketMapper;
import dev.tizmr.OpenTicket.service.TicketService;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.json.JsonMapper;

@WebMvcTest(TicketController.class)
class TicketControllerTest {

  @MockitoBean private TicketService ticketService;

  @MockitoBean private TicketMapper ticketMapper;

  @Autowired private MockMvc mockMvc;

  JsonMapper mapper = JsonMapper.builder().build();

  @Test
  void shouldReturnCreatedTicket() throws Exception {
    Instant now = Instant.now();
    CreateTicketRequestDto request = new CreateTicketRequestDto("Title", "Description");

    Ticket mockTicket = new Ticket();
    mockTicket.setTitle("Title");

    TicketDto mockDto =
        new TicketDto(UUID.randomUUID(), "Title", "Description", TicketStatus.OPEN, now, now);

    when(ticketMapper.fromDto(any(CreateTicketRequestDto.class)))
        .thenReturn(new CreateTicketRequest("Title", "Description"));
    when(ticketService.createTicket(any(CreateTicketRequest.class))).thenReturn(mockTicket);
    when(ticketMapper.toDto(any(Ticket.class))).thenReturn(mockDto);

    mockMvc
        .perform(
            post("/api/v1/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(request)))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.title").value("Title"))
        .andExpect(jsonPath("$.description").value("Description"))
        .andExpect(jsonPath("$.status").value("OPEN"));
  }

  @Test
  void shouldReturnPagedResult() throws Exception {
    Instant now = Instant.now();
    UUID ticketUUID = UUID.randomUUID();

    Ticket mockTicket1 =
        new Ticket(ticketUUID, "Title", "Description", TicketStatus.OPEN, now, now);
    Ticket mockTicket2 =
        new Ticket(UUID.randomUUID(), "Title 2", "Description 2", TicketStatus.OPEN, now, now);
    TicketDto mockTicketDto =
        new TicketDto(ticketUUID, "Title", "Description", TicketStatus.OPEN, now, now);
    List<Ticket> ticketList = List.of(mockTicket1, mockTicket2);

    Page<Ticket> ticketPage = new PageImpl<>(ticketList, PageRequest.of(0, 25), ticketList.size());

    when(ticketService.listTickets(any(Pageable.class))).thenReturn(ticketPage);
    when(ticketMapper.toDto(mockTicket1)).thenReturn(mockTicketDto);

    mockMvc
        .perform(get("/api/v1/tickets").param("page", "0").param("size", "25").param("sort", "title,asc"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(ticketList.size())))
        .andExpect(jsonPath("$.content[0].id").value(ticketUUID.toString()))
        .andExpect(jsonPath("$.pageInfo.totalPages").value(1))
        .andExpect(jsonPath("$.pageInfo.totalElements").value(ticketList.size()))
        .andExpect(jsonPath("$.pageInfo.size").value(25))
        .andExpect(jsonPath("$.pageInfo.page").value(0));
  }
}
