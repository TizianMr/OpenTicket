import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { baseUrlInterceptor } from './base-url.interceptor';

describe('BaseUrlInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // ensures no unexpected requests

  it('should prepend the base URL to relative requests', () => {
    http.get('tickets').subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/tickets');
    expect(req.request.url).toBe('http://localhost:8080/api/v1/tickets');
    req.flush([]);
  });

  it('should preserve request method and body', () => {
    const body = { title: 'Test ticket' };
    http.post('tickets', body).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/tickets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({});
  });

  it('should preserve request headers', () => {
    http.get('tickets', { headers: { Authorization: 'Bearer token123' } }).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/tickets');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
    req.flush([]);
  });
});
