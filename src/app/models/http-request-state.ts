import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface HttpRequestState<T> {
  readonly isLoading: boolean;
  readonly value?: T;
  readonly error?: HttpErrorResponse | Error | undefined;
}

export interface LoadingState<T> extends HttpRequestState<T> {
  readonly isLoading: true;
  readonly value?: T;
  readonly error: undefined;
}

export interface LoadedState<T> extends HttpRequestState<T> {
  readonly isLoading: false;
  readonly value: T;
  readonly error: undefined;
}

export interface ErroredState<T> extends HttpRequestState<T> {
  readonly isLoading: false;
  readonly value?: T;
  readonly error: HttpErrorResponse | Error;
}

export const loadingState = <T = any>(value?: T): LoadingState<T> => ({
  isLoading: true,
  value,
  error: undefined,
});

export const loadedState = <T>(value: T): LoadedState<T> => ({
  isLoading: false,
  error: undefined,
  value,
});

export const erroredState = <T = any>(error: HttpErrorResponse | Error, value?: T): ErroredState<T> => ({
  isLoading: false,
  error,
  value,
});

export function HttpRequestStates<T>(defaultValue?: T) {
  return (source: Observable<T>) => source.pipe(
    map(value => loadedState(value)),
    catchError(error => of(erroredState(error, defaultValue))),
    startWith(loadingState())
  );
}
