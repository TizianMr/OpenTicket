import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { TicketService } from '../../../core/services/ticket';
import { FormsModule } from '@angular/forms';
import { CreateTicket as CreateTicketRequest } from '../../../models/Ticket';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketService);
  isCreating = signal(false);
  error = signal<string | null>(null);

  readonly isOpen = input.required<boolean>();
  close = output<void>();

  closeModal(): void {
    this.close.emit();
    this.error.set(null);
    this.isCreating.set(false);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  submitTicket(ticket: CreateTicketRequest): void {
    this.isCreating.set(true);
    this.error.set(null);
    const subscription = this.ticketService.createTicket(ticket).subscribe({
      error: (error: HttpErrorResponse) => {
        this.error.set(error.error.message);
        this.isCreating.set(false);
      },
      complete: () => {
        this.isCreating.set(false);
        this.closeModal();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
