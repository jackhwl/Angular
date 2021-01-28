import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as JobsActions from './jobs.actions';
import { JobsEntity } from './jobs.models';

export const JOBS_FEATURE_KEY = 'jobs';

export interface JobState extends EntityState<JobsEntity> {
  selectedId?: string | number; // which Jobs record has been selected
  loaded: boolean; // has the Jobs list been loaded
  error?: string | null; // last known error (if any)
}

export interface JobsPartialState {
  readonly [JOBS_FEATURE_KEY]: JobState;
}

export const jobsAdapter: EntityAdapter<JobsEntity> = createEntityAdapter<
  JobsEntity
>();

export const initialJobState: JobState = jobsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _jobsReducer = createReducer(
  initialJobState,
  on(JobsActions.loadJobs, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(JobsActions.loadJobsSuccess, (state, { jobs }) =>
    jobsAdapter.setAll(jobs, { ...state, loaded: true })
  ),
  on(JobsActions.loadJobsFailure, (state, { error }) => ({ ...state, error }))
);

export function jobsReducer(state: JobState | undefined, action: Action) {
  return _jobsReducer(state, action);
}
