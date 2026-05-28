export enum TicketStatus {
  OPEN,
  ASSIGNED,
  IN_PROGRESS,
  CLOSED,
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTicket = Pick<Ticket, 'title' | 'description'>;
