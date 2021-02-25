import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromBooks from '../reducers';
import { ViewBookPageActions } from '../actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'vi-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vi-selected-book-page></vi-selected-book-page>
  `
})
export class ViewBookPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromBooks.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => ViewBookPageActions.selectBook({ id: params.id })))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
