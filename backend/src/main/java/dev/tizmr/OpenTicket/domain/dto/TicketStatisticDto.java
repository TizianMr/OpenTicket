package dev.tizmr.OpenTicket.domain.dto;

public record TicketStatisticDto(
    long numOfOpenTickets, long numOfInProgressTickets, long numOfClosedTickets) {}
