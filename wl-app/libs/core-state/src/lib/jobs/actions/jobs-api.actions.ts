import { createAction, props } from '@ngrx/store';
import { Job } from '@wl/api-interfaces';

export const loadJobsSuccess = createAction(
  '[Jobs/API] Load Jobs Success',
  props<{ jobs: Job[] }>()
);

export const loadJobsFailure = createAction(
  '[Jobs/API] Load Jobs Failure',
  props<{ error: any }>()
);

export const notifyLoadJobsSuccess = createAction(
  '[Toastr Notification/API] Display Load Jobs Success',
  props<{ title: string; description: string; interpolateParams?: Object }>()
);
