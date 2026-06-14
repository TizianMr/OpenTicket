import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDirective } from './modal-directive';
import { ModalService } from '../services/modal-service';

@Component({
  template: `<div appModal="create-ticket"></div>`,
  imports: [ModalDirective],
})
class TestComponent {}

describe('ModalDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let modalService: ModalService;

  beforeEach(() => {
    const mockService = {
      register: vi.fn(),
      unregister: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [{ provide: ModalService, useValue: mockService }],
    });

    fixture = TestBed.createComponent(TestComponent);
    modalService = TestBed.inject(ModalService);
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new ModalDirective());
    expect(directive).toBeTruthy();
  });

  it('should call register function with correct id on init', () => {
    fixture.detectChanges();

    expect(modalService.register).toHaveBeenCalledWith('create-ticket');
    expect(modalService.register).toHaveBeenCalledTimes(1);
  });

  it('should call unregister function with correct id on destroy', () => {
    fixture.destroy();

    expect(modalService.unregister).toHaveBeenCalledWith('create-ticket');
    expect(modalService.unregister).toHaveBeenCalledTimes(1);
  });
});
