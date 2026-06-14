import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { CreateTicket } from './create-ticket';
import { TicketDto, TicketsService } from '../../../core/api-generated';

describe('CreateTicket', () => {
  let component: CreateTicket;
  let ticketService: TicketsService;
  let fixture: ComponentFixture<CreateTicket>;

  const mockTicketService = {
    createTicket: vi.fn(),
  };

  beforeEach(async () => {
    mockTicketService.createTicket.mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [CreateTicket],
      providers: [{ provide: TicketsService, useValue: mockTicketService }],
    }).compileComponents();

    ticketService = TestBed.inject(TicketsService);
    fixture = TestBed.createComponent(CreateTicket);
    fixture.componentRef.setInput('isOpen', false);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen()).toBeFalsy();
  });

  it('should emit close event when closeModal is called', () => {
    const emitSpy = vi.spyOn(component.modalClose, 'emit');

    component.closeModal();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should reset modal state when closeModal is called', () => {
    const errorMsgSpy = vi.spyOn(component.errorMsg, 'set');
    const isCreatingSpy = vi.spyOn(component.isCreating, 'set');

    component.closeModal();

    expect(errorMsgSpy).toHaveBeenCalledWith(null);
    expect(isCreatingSpy).toHaveBeenCalledWith(false);
  });

  it('should call closeModal when target equals currentTarget', () => {
    const closeModalSpy = vi.spyOn(component, 'closeModal');
    const mockElement = document.createElement('div');

    const event = { target: mockElement, currentTarget: mockElement } as unknown as MouseEvent;
    component.onOverlayClick(event);

    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should not call closeModal when target differs from currentTarget', () => {
    const closeModalSpy = vi.spyOn(component, 'closeModal');

    const event = {
      target: document.createElement('div'),
      currentTarget: document.createElement('div'),
    } as unknown as MouseEvent;
    component.onOverlayClick(event);

    expect(closeModalSpy).not.toHaveBeenCalled();
  });

  it('should not create ticket when form is invalid', () => {
    const errorMsgSpy = vi.spyOn(component.errorMsg, 'set');
    const isCreatingSpy = vi.spyOn(component.isCreating, 'set');
    const createTicketSpy = vi.spyOn(ticketService, 'createTicket');
    const mockForm = {
      invalid: true,
    } as unknown as NgForm;

    component.submitTicket(mockForm);

    expect(errorMsgSpy).not.toHaveBeenCalled();
    expect(isCreatingSpy).not.toHaveBeenCalled();
    expect(createTicketSpy).not.toHaveBeenCalled();
  });

  it('should call createTicket with formData', () => {
    const errorMsgSpy = vi.spyOn(component.errorMsg, 'set');
    const isCreatingSpy = vi.spyOn(component.isCreating, 'set');
    const createTicketSpy = vi.spyOn(ticketService, 'createTicket');
    const mockForm = {
      invalid: false,
      value: { title: 'unit test', description: 'this is a unit test' },
    } as unknown as NgForm;

    component.submitTicket(mockForm);

    expect(errorMsgSpy).toHaveBeenCalledWith(null);
    expect(isCreatingSpy).toHaveBeenCalledWith(true);
    expect(createTicketSpy).toHaveBeenCalledWith(mockForm.value);
  });

  it('should set errorMsg and isCreating to false on error', () => {
    const subject = new Subject<TicketDto>();
    mockTicketService.createTicket.mockReturnValue(subject.asObservable());

    const mockForm = { invalid: false, value: {} } as unknown as NgForm;
    component.submitTicket(mockForm);

    const errorResponse = { error: { message: 'Something went wrong' } } as HttpErrorResponse;
    subject.error(errorResponse);

    expect(component.errorMsg()).toBe('Something went wrong');
    expect(component.isCreating()).toBe(false);
  });

  it('should set isCreating to false and call closeModal on complete', () => {
    const subject = new Subject<TicketDto>();
    mockTicketService.createTicket.mockReturnValue(subject.asObservable());
    const closeModalSpy = vi.spyOn(component, 'closeModal');

    const mockForm = { invalid: false, value: {} } as unknown as NgForm;
    component.submitTicket(mockForm);

    subject.complete();

    expect(component.isCreating()).toBe(false);
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should emit submitted event after succesful ticket creation', () => {
    const emitSpy = vi.spyOn(component.submitted, 'emit');

    const subject = new Subject<TicketDto>();
    mockTicketService.createTicket.mockReturnValue(subject.asObservable());

    const mockForm = { invalid: false, value: {} } as unknown as NgForm;
    component.submitTicket(mockForm);

    subject.complete();

    expect(emitSpy).toHaveBeenCalled();
  });
});
