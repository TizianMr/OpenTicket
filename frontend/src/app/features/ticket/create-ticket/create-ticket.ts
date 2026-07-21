import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, output, signal, ViewChild } from '@angular/core';
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
  @ViewChild('ticketForm') private ticketForm?: NgForm;
  @ViewChild('modal') private modal?: Modal;
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketsService);
  isCreating = signal(false);
  errorMsg = signal<string | null>(null);
  submitted = output<void>();

  resetForm(): void {
    this.ticketForm?.resetForm();
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
        this.modal?.close();
        this.resetForm();
        this.submitted.emit();
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
