import { TicketDto } from '../api-generated';

export interface ModalDataMap {
  'create-ticket': null;
  'ticket-details': { ticket: TicketDto };
}

export type ModalId = keyof ModalDataMap;
