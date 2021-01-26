import { createAction, props } from '@ngrx/store';
import { JobsEntity } from './jobs.models';

export const loadJobs = createAction('[Jobs] Load Jobs');

export const loadJobsSuccess = createAction(
  '[Jobs] Load Jobs Success',
  props<{ jobs: JobsEntity[] }>()
);

export const loadJobsFailure = createAction(
  '[Jobs] Load Jobs Failure',
  props<{ error: any }>()
);
