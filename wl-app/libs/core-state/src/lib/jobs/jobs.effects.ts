import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromJobs from './jobs.reducer';
import * as JobsActions from './jobs.actions';
import { JobService } from '@wl/core-data';
import { Job } from '@wl/api-interfaces';
import { finalize, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class JobsEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.loadJobs),
      // mergeMap(() => this.jobService.getAll().pipe(
      //   map((jobs: Job[]) => JobsActions.loadJobsSuccess({ jobs }))
      // ))

      fetch({
        run: action =>
          this.jobService
            .getAll()
            .pipe(map((jobs: Job[]) => JobsActions.loadJobsSuccess({ jobs }))),
        onError: (action, error) => JobsActions.loadJobsFailure({ error })
      })
    )
  );

  constructor(private actions$: Actions, private jobService: JobService) {}
}
