import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-create-ticket',
  imports: [],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  readonly isOpen = input.required<boolean>();
  close = output<void>();

  closeModal(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  submitTicket(): void {
    // TODO: Replace this with real submit logic.
    console.log('Ticket submitted');
    this.closeModal();
  }
}
