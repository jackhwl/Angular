import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from '../reducers';
import { SelectedBookPageActions } from '../actions';
import { Book } from '../models/books';

@Component({
  selector: 'vi-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vi-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </vi-book-detail>
  `
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromBooks.State>) {
    this.book$ = store.pipe(select(fromBooks.getSelectedBook)) as Observable<
      Book
    >;
    this.isSelectedBookInCollection$ = store.pipe(
      select(fromBooks.isSelectedBookInCollection)
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.addBook({ book }));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.removeBook({ book }));
  }
}
