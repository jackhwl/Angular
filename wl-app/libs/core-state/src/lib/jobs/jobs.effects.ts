import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { JobsActions, JobsApiActions } from './actions';
import { JobService, ToastService } from '@wl/core-data';
import { Job } from '@wl/api-interfaces';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class JobsEffects {
  notifyLoadJobsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JobsApiActions.notifyLoadJobsSuccess),
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
      //   JobsActions.loadJobsSuccess({ jobs }),
      //   JobsActions.displayLoadJobsSuccess({title: 'GET', description: 'i18.job.job_retrieved_successfully'}),
      // ])
      // ))
      fetch({
        run: action =>
          this.jobService.getAll().pipe(
            switchMap((jobs: Job[]) => [
              JobsApiActions.loadJobsSuccess({ jobs }),
              JobsApiActions.notifyLoadJobsSuccess({
                description: 'i18.job.job_retrieved_successfully',
                title: 'GET',
                interpolateParams: { counter: jobs.length }
              })
            ])
          ),
        onError: (action, error) => JobsApiActions.loadJobsFailure({ error })
      })
    )
  );

  constructor(
    private actions$: Actions,
    private jobService: JobService,
    private toastService: ToastService
  ) {}
}
