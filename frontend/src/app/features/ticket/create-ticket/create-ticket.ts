import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { TicketService } from '../../../core/services/ticket';
import { FormsModule } from '@angular/forms';
import { CreateTicket as CreateTicketRequest } from '../../../models/Ticket';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketService);
  isCreating = signal(false);

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

  submitTicket(ticket: CreateTicketRequest): void {
    this.isCreating.set(true);
    const subscription = this.ticketService.createTicket(ticket).subscribe(
      {
        error: (error) => {
          // TODO: handle error case
        },
        complete: () => {
          this.isCreating.set(false);
          // FIXME: wird immer gecalled?
          this.closeModal()
        } 
      }
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
