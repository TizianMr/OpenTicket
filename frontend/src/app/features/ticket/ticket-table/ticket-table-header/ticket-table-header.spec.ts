import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTableHeader } from './ticket-table-header';
import { SortDirection } from '../ticket-table';

describe('TicketTableHeader', () => {
  let component: TicketTableHeader;
  let fixture: ComponentFixture<TicketTableHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTableHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTableHeader);
    fixture.componentRef.setInput('headers', [
      { key: 'name', label: 'Name', sortDirection: undefined },
      { key: 'age', label: 'Age', sortDirection: SortDirection.DESC },
      { key: 'email', label: 'Email', sortDirection: SortDirection.ASC },
    ]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event ASC', () => {
    const emitSpy = vi.spyOn(component.sort, 'emit');

    component.onSort('name');

    expect(emitSpy).toHaveBeenCalledWith({ key: 'name', direction: SortDirection.ASC });
  });

  it('should emit sort event DESC', () => {
    const emitSpy = vi.spyOn(component.sort, 'emit');

    component.onSort('email');

    expect(emitSpy).toHaveBeenCalledWith({ key: 'email', direction: SortDirection.DESC });
  });

  it('should emit sort event UNDEFINED', () => {
    const emitSpy = vi.spyOn(component.sort, 'emit');

    component.onSort('age');

    expect(emitSpy).toHaveBeenCalledWith({ key: 'age', direction: undefined });
  });
});
