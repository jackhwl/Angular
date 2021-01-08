import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, of, throwError, timer } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  delayWhen,
  retryWhen,
  take,
  tap
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  catchReThrowError() {
    return catchError(this.handleError);
  }

  retryAfter(delayN: number, stop: number = 3) {
    return retryWhen(errors => {
      return errors.pipe(
        concatMap((e, i) =>
          iif(
            () => i >= stop,
            throwError(e),
            of(e).pipe(
              delay(delayN),
              tap(() => console.log('retrying...', i + 1))
            )
          )
        )
      );
    });
  }

  retryAfter0(delay: number, stop: number) {
    return retryWhen(errors => {
      return errors.pipe(
        delayWhen(() => timer(delay)),
        tap(() => console.log('retrying...')),
        take(stop)
        //concat(Observable.throw)
      );
    });
  }

  private handleError(err: any): Observable<never> {
    console.error(err);
    // 99in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `HttpErrorResponse returned code ${err.status}: ${err.statusText}`;
    } else if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    return throwError(errorMessage);
  }
}
