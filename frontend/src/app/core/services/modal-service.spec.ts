import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal-service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize service with empty Sets', () => {
    expect(service['registered']().size).toBe(0);
    expect(service['opened']().size).toBe(0);
  });

  it('should register modal', () => {
    service.register('create-ticket');

    expect(service['registered']().has('create-ticket')).toBeTruthy();
  });

  it('should throw error when trying to register modal twice', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));
    const spy = vi.spyOn(service['registered'], 'update');

    expect(() => service.register(modalId)).toThrow(`Modal "${modalId}" is already registered.`);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should unregister modal', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));

    service.unregister(modalId);

    expect(service['registered']().has(modalId)).toBeFalsy();
  });

  it('should add modal to opened signal', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));

    service.open(modalId);

    expect(service['opened']().has(modalId)).toBeTruthy();
  });

  it('should throw error when opening unregistered modal', () => {
    const modalId = 'create-ticket';

    expect(() => service.open(modalId)).toThrow(
      `Modal "${modalId}" is not registered. Make sure a component using appModal="${modalId}" is present in the DOM.`,
    );
    expect(service['opened']().has(modalId)).toBeFalsy();
  });

  it('should remove modal from opened signal', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));

    service.open(modalId);
    service.close(modalId);

    expect(service['opened']().has(modalId)).toBeFalsy();
  });

  it('should throw error when closing unregistered modal', () => {
    const modalId = 'create-ticket';

    expect(() => service.close(modalId)).toThrow(
      `Modal "${modalId}" is not registered. Make sure a component using appModal="${modalId}" is present in the DOM.`,
    );
    expect(service['opened']().has(modalId)).toBeFalsy();
  });

  it('should return true if modal is open', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));
    const spy = vi.spyOn(service, 'isOpen');

    service.open(modalId);
    service.isOpen(modalId);

    expect(spy).toHaveReturnedWith(true);
  });

  it('should return false if modal is closed', () => {
    const modalId = 'create-ticket';
    service['registered'].update(s => new Set(s).add(modalId));
    const spy = vi.spyOn(service, 'isOpen');

    service.isOpen(modalId);

    expect(spy).toHaveReturnedWith(false);
  });
});
