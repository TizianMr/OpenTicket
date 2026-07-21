import { Component, computed, inject, input, output } from '@angular/core';

import { ModalDirective } from '../../../core/directives/modal-directive';
import { ModalId } from '../../../core/services/modal-constants';
import { ModalService } from '../../../core/services/modal-service';

@Component({
  selector: 'app-modal-header',
  template: `<ng-content>modal-header</ng-content>`,
})
export class ModalTitle {}

@Component({
  selector: 'app-modal-content',
  template: `<ng-content>modal-content</ng-content>`,
})
export class ModalContent {}

@Component({
  selector: 'app-modal',
  imports: [ModalDirective],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly modalId = input.required<ModalId>();
  readonly modalClose = output<void>();

  protected readonly modalService = inject(ModalService);
  readonly isOpen = computed(() => this.modalService.isOpen(this.modalId()));

  close(): void {
    this.modalService.close(this.modalId());
    this.modalClose.emit();
  }

  onOverlayClick(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close();
      }
      return;
    }

    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
