import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { JobsActions, JobsApiActions } from './actions';
//import { JobsEntity } from './jobs.models';
import { Job } from '@wl/api-interfaces';

export const JOBS_FEATURE_KEY = 'jobs';

export interface JobState extends EntityState<Job> {
  selectedId?: string | number; // which Jobs record has been selected
  loaded: boolean; // has the Jobs list been loaded
  error?: string | null; // last known error (if any)
}

export interface JobsPartialState {
  readonly [JOBS_FEATURE_KEY]: JobState;
}

export const jobsAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export const initialJobState: JobState = jobsAdapter.getInitialState({
  // set initial required properties
  selectedId: 3,
  loaded: false,
  entities: {}
});

const _jobsReducer = createReducer(
  initialJobState,
  on(JobsActions.loadJobs, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(JobsApiActions.loadJobsSuccess, (state, { jobs }) => {
    return jobsAdapter.setAll(jobs, { ...state, loaded: true });
  }),
  on(JobsApiActions.loadJobsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(JobsApiActions.notifyLoadJobsSuccess, state => state)
);

export function jobsReducer(state: JobState | undefined, action: Action) {
  return _jobsReducer(state, action);
}
