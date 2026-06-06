import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableLoading } from './ticket-table-loading';

describe('TicketLoading', () => {
  let component: TicketTableLoading;
  let fixture: ComponentFixture<TicketTableLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTableLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
