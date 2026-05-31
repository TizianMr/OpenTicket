import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { TicketsService } from '../../../core/api-generated';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketsService);
  isCreating = signal(false);
  errorMsg = signal<string | null>(null);

  readonly isOpen = input.required<boolean>();
  readonly modalClose = output<void>();

  closeModal(): void {
    this.modalClose.emit();
    this.errorMsg.set(null);
    this.isCreating.set(false);
  }

  onOverlayClick(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
      return;
    }

    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  submitTicket(formData: NgForm): void {
    if (formData.invalid) return;

    this.isCreating.set(true);
    this.errorMsg.set(null);

    const subscription = this.ticketService.createTicket(formData.value).subscribe({
      error: (error: HttpErrorResponse) => {
        this.errorMsg.set(error.error.message);
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
