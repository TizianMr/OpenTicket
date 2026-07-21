import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Icon } from '../../../common/icons/icon';
import { Modal, ModalTitle, ModalContent } from '../../../common/shared/modal/modal';
import { TicketsService } from '../../../core/api-generated';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule, CommonModule, Icon, Modal, ModalTitle, ModalContent],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketsService);
  isCreating = signal(false);
  errorMsg = signal<string | null>(null);
  submitted = output<void>();

  closeModal(): void {
    // FIXME: reset form
    this.errorMsg.set(null);
    this.isCreating.set(false);
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
        this.submitted.emit();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
