import { Component, signal } from '@angular/core';
import { CreateTicket } from '../ticket/create-ticket/create-ticket';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTicket],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  modalOpen = signal(false);

  openModal(): void {
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }
}
