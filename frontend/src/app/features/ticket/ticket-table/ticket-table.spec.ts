import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TicketTable } from './ticket-table';
import { TicketsService } from '../../../core/api-generated';

describe('TicketTable', () => {
  let component: TicketTable;
  let fixture: ComponentFixture<TicketTable>;

  beforeEach(async () => {
    const mockTicketsService = {
      listTickets: vi.fn().mockReturnValue(
        of({
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
          content: [],
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [TicketTable],
      providers: [{ provide: TicketsService, useValue: mockTicketsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
