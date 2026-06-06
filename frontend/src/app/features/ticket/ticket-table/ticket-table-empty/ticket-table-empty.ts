import { Component, inject } from '@angular/core';

import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-ticket-table-empty',
  imports: [],
  templateUrl: './ticket-table-empty.html',
})
export class TicketTableEmpty {
  private modalService = inject(ModalService);

  onTicketCreate(): void {
    this.modalService.open('create-ticket');
  }
}
