import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Job } from '@wl/api-interfaces';
import { JobService, ToastService } from '@wl/core-data';
import { BehaviorSubject, pipe } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import * as fromJobs from './jobs.reducer';
import * as JobsSelectors from './jobs.selectors';

import * as JobsActions from './jobs.actions';
import { JobState } from './jobs.reducer';

@Injectable()
export class JobsFacade {
  private loading = new BehaviorSubject<boolean>(true);
  private jobs = new BehaviorSubject<Job[]>(null);

  jobs$ = this.store.pipe(select(() => JobsSelectors.getAllJobs)); //this.jobs.asObservable();
  loading$ = this.loading.asObservable();

  nfs = {
    getAll: {
      i18n_key: 'i18.villains.villains_retrieved_successfully',
      action: 'GET'
    },
    add: {
      i18n_key: 'i18.villains.villain_created',
      action: 'POST'
    },
    update: {
      i18n_key: 'i18.villains.villain_updated',
      action: 'PUT'
    },
    delete: {
      i18n_key: 'i18.villains.villain_deleted',
      action: 'DELETE'
    }
  };
  constructor(
    private store: Store<JobState>,
    private jobService: JobService,
    private toastService: ToastService
  ) {}

  notification(type: string, name: string, cb?: any) {
    cb
      ? cb()
      : this.toastService.open(this.nfs[type].i18n_key, this.nfs[type].action, {
          name
        });
  }

  sideFinalize = (type: string, name: string, cb?: any) =>
    pipe(
      finalize(() => this.loading.next(false)),
      tap(() => this.notification(type, name, cb))
    );

  getAll2(cb?: any) {
    this.loading.next(true);
    this.jobService
      .getAll()
      .pipe(this.sideFinalize('getAll', '', cb))
      .subscribe((jobs: Job[]) => this.jobs.next(jobs));
  }

  getAll() {
    this.store.dispatch(JobsActions.loadJobs());
  }
}
