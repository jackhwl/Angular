import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as JobsSelectors from './jobs.selectors';

import * as JobsActions from './jobs.actions';

@Injectable()
export class JobsFacade {
  jobs$ = this.store.pipe(select(JobsSelectors.getAllJobs));

  private loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  constructor(private store: Store<{}>) {}

  getAll() {
    this.store.dispatch(JobsActions.loadJobs());
  }
}
