import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableError } from './ticket-table-error';

describe('TicketError', () => {
  let component: TicketTableError;
  let fixture: ComponentFixture<TicketTableError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTableError],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
