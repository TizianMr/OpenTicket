package dev.tizmr.OpenTicket.repository;

import dev.tizmr.OpenTicket.domain.entity.Ticket;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {}
