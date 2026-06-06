import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableEmpty } from './ticket-table-empty';

describe('TicketEmpty', () => {
  let component: TicketTableEmpty;
  let fixture: ComponentFixture<TicketTableEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTableEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
