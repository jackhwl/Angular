import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromJobs from './jobs.reducer';
import * as JobsActions from './jobs.actions';

@Injectable()
export class JobsEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.loadJobs),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return JobsActions.loadJobsSuccess({ jobs: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return JobsActions.loadJobsFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
