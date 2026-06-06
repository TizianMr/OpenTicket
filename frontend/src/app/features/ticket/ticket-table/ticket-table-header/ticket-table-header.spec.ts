import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableHeader } from './ticket-table-header';

describe('TicketHeader', () => {
  let component: TicketTableHeader;
  let fixture: ComponentFixture<TicketTableHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTableHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
