import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { GoogleBooksService } from "../book-list/books.service";
import * as BooksActions from "./books.actions";

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBookList),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          tap(books => console.log("aaa=", books)),
          map(books => BooksActions.retrievedBookList({ books })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: GoogleBooksService
  ) {}
}
