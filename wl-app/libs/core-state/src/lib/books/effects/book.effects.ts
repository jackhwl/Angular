import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, EMPTY as empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { FindBookPageActions, BooksApiActions } from '../actions';
import { Book } from '@wl/api-interfaces';
import { GoogleBooksService } from '@wl/core-data';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {
  search$ = createEffect(
    ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
      this.actions$.pipe(
        ofType(FindBookPageActions.searchBooks.type),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {
          if (query === '') {
            return empty;
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(FindBookPageActions.searchBooks.type),
            skip(1)
          );

          return this.googleBooks.searchBooks(query).pipe(
            takeUntil(nextSearch$),
            map((books: Book[]) => BooksApiActions.searchSuccess({ books })),
            catchError(err =>
              of(BooksApiActions.searchFailure({ errorMsg: err }))
            )
          );
        })
      )
  );

  constructor(
    private actions$: Actions<FindBookPageActions.FindBookPageActionsUnion>,
    private googleBooks: GoogleBooksService
  ) {}
}
