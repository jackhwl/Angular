import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as JobsActions from './jobs.actions';
import { JobService, ToastService } from '@wl/core-data';
import { Job } from '@wl/api-interfaces';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class JobsEffects {
  nfs = {
    getAll: {
      i18n_key: 'i18.villains.villains_retrieved_successfully',
      verb: 'GET'
    },
    add: {
      i18n_key: 'i18.villains.villain_created',
      verb: 'POST'
    },
    update: {
      i18n_key: 'i18.villains.villain_updated',
      verb: 'PUT'
    },
    delete: {
      i18n_key: 'i18.villains.villain_deleted',
      verb: 'DELETE'
    }
  };

  notification(item: string, name: string, cb?: any) {
    cb
      ? cb()
      : this.toastService.open(this.nfs[item].i18n_key, this.nfs[item].verb, {
          name
        });
  }

  displayLoadJobsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JobsActions.displayLoadJobsSuccess),
        tap(action => {
          this.notification(action.item, action.title);
        })
      ),
    { dispatch: false }
  );

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.loadJobs),
      // mergeMap(() => this.jobService.getAll().pipe(
      // switchMap((jobs: Job[]) => [
      //   JobsActions.displayLoadJobsSuccess({item: 'getAll', title: '', description: ''}),
      //   JobsActions.loadJobsSuccess({ jobs }),
      // ])
      // ))
      fetch({
        run: action =>
          this.jobService.getAll().pipe(
            tap(jobs => console.log('bb=', jobs)),
            switchMap((jobs: Job[]) => [
              JobsActions.displayLoadJobsSuccess({
                item: 'getAll',
                title: '',
                description: ''
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
