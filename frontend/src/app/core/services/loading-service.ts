// loading.service.ts
import { Injectable, Signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, timer, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  delayedLoading(isLoading: Signal<boolean>, delay = 500): Signal<boolean> {
    return toSignal(
      toObservable(isLoading).pipe(switchMap(loading => (loading ? timer(delay).pipe(map(() => true)) : of(false)))),
      { initialValue: false },
    );
  }
}
