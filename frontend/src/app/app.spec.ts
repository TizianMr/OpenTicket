import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { App } from './app';
import { TicketsService } from './core/api-generated';

describe('App', () => {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: TicketsService, useValue: mockTicketsService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    expect(app).toBeTruthy();
  });
});
