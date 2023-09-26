import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface HttpRequestState<T> {
  isLoading: boolean;
  value?: T;
  error?: HttpErrorResponse | Error;
}

export function HttpRequestStates<T>(defaultValue?: T) {
  return (source: Observable<T>) => source.pipe(
    map(value => ({ isLoading: false, value })),
    catchError(error => of({ isLoading: false, value: defaultValue, error })),
    startWith({ isLoading: true })
  );
}
