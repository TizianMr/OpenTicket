import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTablePagination } from './ticket-table-pagination';

describe('TicketTablePagination', () => {
  let component: TicketTablePagination;
  let fixture: ComponentFixture<TicketTablePagination>;

  const paginationState = {
    page: 0,
    size: 10,
    totalElements: 100,
    totalPages: 10,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTablePagination],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTablePagination);
    fixture.componentRef.setInput('paginationState', paginationState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if page is last page', () => {
    fixture.componentRef.setInput('paginationState', { ...paginationState, page: paginationState.totalPages - 1 });

    expect(component.isLastPage()).toBeTruthy();
  });

  it('should return false if page is NOT last page', () => {
    fixture.componentRef.setInput('paginationState', { ...paginationState, page: 4 });

    expect(component.isLastPage()).toBeFalsy();
  });

  it('should return true if page is first page', () => {
    fixture.componentRef.setInput('paginationState', { ...paginationState, page: 0 });

    expect(component.isFirstPage()).toBeTruthy();
  });

  it('should return false if page is NOT first page', () => {
    fixture.componentRef.setInput('paginationState', { ...paginationState, page: 4 });

    expect(component.isFirstPage()).toBeFalsy();
  });

  it('should return correct min, max and total values for first page', () => {
    expect(component.tableInfo()).toEqual({ min: 1, max: paginationState.size, total: paginationState.totalElements });
  });

  it('should return correct min, max and total values for last page', () => {
    fixture.componentRef.setInput('paginationState', { ...paginationState, page: 9, totalElements: 95 });

    expect(component.tableInfo()).toEqual({
      min: 91,
      max: 95,
      total: 95,
    });
  });

  it('should emit correct pageChange event onForwardClick', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.onForwardClick();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(paginationState.page + 1);
  });

  it('should emit correct pageChange event onBackwardsClick', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.onBackwardsClick();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(paginationState.page - 1);
  });

  it('should emit correct pageChange event onFirstPageClick', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.onFirstPageClick();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(0);
  });

  it('should emit correct pageChange event onLastPageClick', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.onLastPageClick();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(paginationState.totalPages - 1);
  });

  it('should emit correct sizeChange event onSizeChange', () => {
    const emitSpy = vi.spyOn(component.sizeChange, 'emit');

    component.onSizeChange({ target: { value: 50 } } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(50);
  });
});
