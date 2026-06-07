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

  it('should reload when calling onReloadPage', () => {
    const reloadSpy = vi.fn();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, reload: reloadSpy },
    });
    component.onReloadPage();

    expect(reloadSpy).toHaveBeenCalled();
  });
});
