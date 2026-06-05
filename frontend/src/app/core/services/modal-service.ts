import { Injectable, signal } from '@angular/core';

import { ModalId } from './modal-constants';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly _open = signal<Set<ModalId>>(new Set());
  private readonly _registered = signal<Set<ModalId>>(new Set());

  register(id: ModalId): void {
    if (this._registered().has(id)) {
      throw new Error(`Modal "${id}" is already registered.`);
    }
    this._registered.update(s => new Set(s).add(id));
  }

  unregister(id: ModalId): void {
    this._registered.update(s => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }

  open(id: ModalId): void {
    this.assertRegistered(id);
    this._open.update(s => new Set(s).add(id));
  }

  close(id: ModalId): void {
    this.assertRegistered(id);
    this._open.update(s => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }

  isOpen(id: ModalId): boolean {
    return this._open().has(id);
  }

  private assertRegistered(id: ModalId): void {
    if (!this._registered().has(id)) {
      throw new Error(
        `Modal "${id}" is not registered. Make sure a component using appModal="${id}" is present in the DOM.`,
      );
    }
  }
}
