import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false immediately when isLoading is false', async () => {
    const isLoading = signal(false);
    const delayed = TestBed.runInInjectionContext(() => service.delayedLoading(isLoading));

    await vi.advanceTimersByTimeAsync(500);
    expect(delayed()).toBe(false);
  });

  it('should return false before delay when isLoading is true', async () => {
    const isLoading = signal(true);
    const delayed = TestBed.runInInjectionContext(() => service.delayedLoading(isLoading));

    await vi.advanceTimersByTimeAsync(300);
    expect(delayed()).toBe(false);
  });

  it('should return true after delay when isLoading is true', async () => {
    const isLoading = signal(true);
    const delayed = TestBed.runInInjectionContext(() => service.delayedLoading(isLoading));

    await vi.advanceTimersByTimeAsync(500);
    expect(delayed()).toBe(true);
  });

  it('should cancel timer and return false if loading stops before delay', async () => {
    const isLoading = signal(true);
    const delayed = TestBed.runInInjectionContext(() => service.delayedLoading(isLoading));

    await vi.advanceTimersByTimeAsync(300);
    isLoading.set(false);
    await vi.advanceTimersByTimeAsync(200);
    expect(delayed()).toBe(false);
  });

  it('should respect a custom delay', async () => {
    const isLoading = signal(true);
    const delayed = TestBed.runInInjectionContext(() => service.delayedLoading(isLoading, 1000));

    await vi.advanceTimersByTimeAsync(999);
    TestBed.tick();
    expect(delayed()).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    TestBed.tick();
    expect(delayed()).toBe(true);
  });
});
