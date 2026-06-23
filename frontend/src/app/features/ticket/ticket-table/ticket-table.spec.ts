import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TicketTable } from './ticket-table';
import { SortDirection } from './ticket-table.types';
import { TicketsService } from '../../../core/api-generated';

describe('TicketTable', () => {
  let component: TicketTable;
  let fixture: ComponentFixture<TicketTable>;

  beforeEach(async () => {
    const mockTicketsService = {
      listTickets: vi.fn().mockReturnValue(
        of({
          pageInfo: {
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
          },
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

    component['headers'].set([
      { key: 'name', label: 'Name', sortDirection: undefined },
      { key: 'age', label: 'Age', sortDirection: undefined },
      { key: 'email', label: 'Email', sortDirection: SortDirection.ASC },
    ]);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update tableState onPageChange', () => {
    component.onPageChange(2);

    expect(component.tableState()).toEqual({ page: 2, size: component.tableState().size });
  });

  it('should update tableState onSizeChange', () => {
    component.onSizeChange(25);

    expect(component.tableState()).toEqual({ page: 0, size: 25 });
  });

  it('should call refetch when calling reload', () => {
    const resourceSpy = vi.spyOn(component.ticketResource, 'reload');

    component.reload();

    expect(resourceSpy).toHaveBeenCalledOnce();
  });

  it('should set sortDirection on the matching header and clear all others', () => {
    component.onSort('name', SortDirection.ASC);

    expect(component['headers']()).toEqual([
      { key: 'name', label: 'Name', sortDirection: SortDirection.ASC },
      { key: 'age', label: 'Age', sortDirection: undefined },
      { key: 'email', label: 'Email', sortDirection: undefined },
    ]);
  });

  it('should switch direction when a different direction is passed for the already sorted header', () => {
    component.onSort('email', SortDirection.DESC);

    expect(component['headers']()).toEqual([
      { key: 'name', label: 'Name', sortDirection: undefined },
      { key: 'age', label: 'Age', sortDirection: undefined },
      { key: 'email', label: 'Email', sortDirection: SortDirection.DESC },
    ]);
  });

  it('should clear existing sort and do nothing when an unknown headerKey is passed', () => {
    component.onSort('nonexistent', SortDirection.ASC);

    expect(component['headers']().every(h => h.sortDirection === undefined)).toBe(true);
  });
});
