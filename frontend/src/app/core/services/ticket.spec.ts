import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket';
import { HttpClient } from '@angular/common/http';
import { CreateTicket } from '../../models/Ticket';
import { of } from 'rxjs';

describe('Ticket', () => {
  let service: TicketService;
  const mockHttpClient = { post: vi.fn().mockReturnValue(of()) } as unknown as HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService, { provide: HttpClient, useValue: mockHttpClient }],
    });

    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post with the correct URL and body', () => {
    const payload: CreateTicket = { title: 'Fix bug', description: 'Something is broken' };
    service.createTicket(payload).subscribe();

    expect(mockHttpClient.post).toHaveBeenCalledWith('tickets', payload);
  });
});
