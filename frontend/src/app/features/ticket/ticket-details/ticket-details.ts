import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { Modal, ModalTitle, ModalContent } from '../../../common/shared/modal/modal';
import { ModalService } from '../../../core/services/modal-service';
import { TicketStatusBadge } from '../_shared/ticket-status-badge/ticket-status-badge';

@Component({
  selector: 'app-ticket-details',
  imports: [DatePipe, TicketStatusBadge, Modal, ModalTitle, ModalContent],
  templateUrl: './ticket-details.html',
})
export class TicketDetails {
  private readonly modalService = inject(ModalService);
  private readonly data = computed(() => this.modalService.getData('ticket-details'));
  readonly ticket = computed(() => this.data()?.ticket);
}
