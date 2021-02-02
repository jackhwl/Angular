import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as JobsActions from './jobs.actions';
import { JobService, ToastService } from '@wl/core-data';
import { Job } from '@wl/api-interfaces';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class JobsEffects {
  displayLoadJobsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JobsActions.displayLoadJobsSuccess),
        tap(action => {
          this.toastService.open(
            action.description,
            action.title,
            action.interpolateParams
          );
        })
      ),
    { dispatch: false }
  );

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.loadJobs),
      // mergeMap(() => this.jobService.getAll().pipe(
      // switchMap((jobs: Job[]) => [
      //   JobsActions.displayLoadJobsSuccess({title: 'GET', description: 'i18.job.job_retrieved_successfully'}),
      //   JobsActions.loadJobsSuccess({ jobs }),
      // ])
      // ))
      fetch({
        run: action =>
          this.jobService.getAll().pipe(
            tap(jobs => console.log('bb=', jobs)),
            switchMap((jobs: Job[]) => [
              JobsActions.displayLoadJobsSuccess({
                description: 'i18.job.job_retrieved_successfully',
                title: 'GET'
              }),
              JobsActions.loadJobsSuccess({ jobs })
            ])
          ),
        onError: (action, error) => JobsActions.loadJobsFailure({ error })
      })
    )
  );

  constructor(
    private actions$: Actions,
    private jobService: JobService,
    private toastService: ToastService
  ) {}
}
