import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  JOBS_FEATURE_KEY,
  State,
  JobsPartialState,
  jobsAdapter
} from './jobs.reducer';

// Lookup the 'Jobs' feature state managed by NgRx
export const getJobsState = createFeatureSelector<JobsPartialState, State>(
  JOBS_FEATURE_KEY
);

const { selectAll, selectEntities } = jobsAdapter.getSelectors();

export const getJobsLoaded = createSelector(
  getJobsState,
  (state: State) => state.loaded
);

export const getJobsError = createSelector(
  getJobsState,
  (state: State) => state.error
);

export const getAllJobs = createSelector(
  getJobsState,
  (state: State) => selectAll(state)
);

export const getJobsEntities = createSelector(
  getJobsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getJobsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getJobsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
