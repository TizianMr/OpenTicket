import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusBadge } from './ticket-status-badge';

describe('TicketStatusBadge', () => {
  let component: TicketStatusBadge;
  let fixture: ComponentFixture<TicketStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketStatusBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
