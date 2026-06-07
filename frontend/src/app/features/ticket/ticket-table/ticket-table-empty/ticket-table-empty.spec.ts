import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableEmpty } from './ticket-table-empty';
import { ModalService } from '../../../../core/services/modal-service';

describe('TicketEmpty', () => {
  let component: TicketTableEmpty;
  let fixture: ComponentFixture<TicketTableEmpty>;
  let modalService: ModalService;

  beforeEach(async () => {
    const mockService = {
      open: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TicketTableEmpty],
      providers: [{ provide: ModalService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableEmpty);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalServie when calling onTicketCreate', () => {
    const spy = vi.spyOn(modalService, 'open');

    component.onTicketCreate();

    expect(spy).toHaveBeenCalled();
  });
});
