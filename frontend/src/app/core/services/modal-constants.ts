export const MODAL_IDS = {
  createTicket: 'create-ticket',
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];
