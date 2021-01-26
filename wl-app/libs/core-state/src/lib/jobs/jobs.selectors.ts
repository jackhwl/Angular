import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  JOBS_FEATURE_KEY,
  JobState,
  JobsPartialState,
  jobsAdapter
} from './jobs.reducer';

// Lookup the 'Jobs' feature state managed by NgRx
export const getJobsState = createFeatureSelector<JobsPartialState, JobState>(
  JOBS_FEATURE_KEY
);

const { selectAll, selectEntities } = jobsAdapter.getSelectors();

export const getJobsLoaded = createSelector(
  getJobsState,
  (state: JobState) => state.loaded
);

export const getJobsError = createSelector(
  getJobsState,
  (state: JobState) => state.error
);

export const getAllJobs = createSelector(
  getJobsState,
  (state: JobState) => selectAll(state)
);

export const getJobsEntities = createSelector(
  getJobsState,
  (state: JobState) => selectEntities(state)
);

export const getJobSelectedId = createSelector(
  getJobsState,
  (state: JobState) => state.selectedId
);

export const getSelectedJob = createSelector(
  getJobsEntities,
  getJobSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
