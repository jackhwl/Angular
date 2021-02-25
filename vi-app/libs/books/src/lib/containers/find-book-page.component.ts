import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromBooks from '../reducers';
import { FindBookPageActions } from '../actions';
import { Book } from '../models/books';

@Component({
  selector: 'vi-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vi-book-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)"
    >
    </vi-book-search>
    <vi-book-preview-list [books]="books$ | async"> </vi-book-preview-list>
  `
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );
    this.books$ = store.pipe(select(fromBooks.getSearchResults));
    this.loading$ = store.pipe(select(fromBooks.getSearchLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));
  }

  search(query: string) {
    this.store.dispatch(FindBookPageActions.searchBooks({ query }));
  }
}
