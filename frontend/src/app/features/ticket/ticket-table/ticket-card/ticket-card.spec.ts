import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCard } from './ticket-card';
import { TicketDto, TicketStatus } from '../../../../core/api-generated';

describe('TicketCard', () => {
  let component: TicketCard;
  let fixture: ComponentFixture<TicketCard>;

  const mockTicket: TicketDto = {
    id: '041ef393-c17e-436e-adb6-f2a9b748ae51',
    title: 'Mock',
    description: 'This is a mock',
    status: TicketStatus.OPEN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketCard);
    fixture.componentRef.setInput('ticket', mockTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
