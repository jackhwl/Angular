import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromJobs from './jobs.reducer';
import * as JobsSelectors from './jobs.selectors';

@Injectable()
export class JobsFacade {
  loaded$ = this.store.pipe(select(JobsSelectors.getJobsLoaded));
  allJobs$ = this.store.pipe(select(JobsSelectors.getAllJobs));
  selectedJobs$ = this.store.pipe(select(JobsSelectors.getSelected));

  constructor(private store: Store<fromJobs.JobsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
