import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Dashboard } from './dashboard';
import { TicketsService } from '../../core/api-generated';
import { ModalService } from '../../core/services/modal-service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    const mockModalService = {
      open: vi.fn(),
      isOpen: vi.fn(),
      register: vi.fn(),
      unregister: vi.fn(),
    };

    const mockTicketsService = {
      listTickets: vi.fn().mockReturnValue(
        of({
          pageInfo: { page: 0, size: 10, totalElements: 0, totalPages: 0 },
          content: [],
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: ModalService, useValue: mockModalService },
        { provide: TicketsService, useValue: mockTicketsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
