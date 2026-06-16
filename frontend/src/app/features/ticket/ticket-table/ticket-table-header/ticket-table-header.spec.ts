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
    fixture.componentRef.setInput('headers', '[A, B, C]');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event with correct params', () => {
    const emitSpy = vi.spyOn(component.sort, 'emit');

    component.onSort('A', SortDirection.ASC);

    expect(emitSpy).toHaveBeenCalledWith({ key: 'A', direction: SortDirection.ASC });
  });
});
