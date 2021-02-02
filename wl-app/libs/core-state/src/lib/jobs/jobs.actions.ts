import { createAction, props } from '@ngrx/store';
import { Job } from '@wl/api-interfaces';
//import { JobsEntity } from './jobs.models';

export const loadJobs = createAction('[Jobs] Load Jobs');

export const loadJobsSuccess = createAction(
  '[Jobs] Load Jobs Success',
  props<{ jobs: Job[] }>()
);

export const loadJobsFailure = createAction(
  '[Jobs] Load Jobs Failure',
  props<{ error: any }>()
);

export const notifyLoadJobsSuccess = createAction(
  '[Toastr Notification] Display Load Jobs Success',
  props<{ title: string; description: string; interpolateParams?: Object }>()
);
