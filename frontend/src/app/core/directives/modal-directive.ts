import { Directive, OnDestroy, OnInit, inject, input } from '@angular/core';

import { ModalId } from '../services/modal-constants';
import { ModalService } from '../services/modal-service';

@Directive({
  selector: '[appModal]',
  standalone: true,
})
export class ModalDirective implements OnInit, OnDestroy {
  private readonly modalService = inject(ModalService);

  readonly appModal = input.required<ModalId>();

  ngOnInit(): void {
    this.modalService.register(this.appModal());
  }

  ngOnDestroy(): void {
    this.modalService.unregister(this.appModal());
  }
}
