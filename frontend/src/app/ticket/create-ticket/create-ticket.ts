import { Component, input, output, signal } from '@angular/core';
import { Dropzone } from "../../ui/dropzone/dropzone";

@Component({
  selector: 'app-create-ticket',
  imports: [Dropzone],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  readonly isOpen = input.required<boolean>();
  close = output<void>();
  droppedFiles = signal<File[]>([]);

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
    const files = this.droppedFiles();
    console.log('Ticket submitted', { files });
    this.closeModal();
  }
}
