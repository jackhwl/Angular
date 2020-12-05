import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STUDENTS_FEATURE_KEY,
  State,
  StudentsPartialState,
  studentsAdapter,
} from './students.reducer';

// Lookup the 'Students' feature state managed by NgRx
export const getStudentsState = createFeatureSelector<
  StudentsPartialState,
  State
>(STUDENTS_FEATURE_KEY);

const { selectAll, selectEntities } = studentsAdapter.getSelectors();

export const getStudentsLoaded = createSelector(
  getStudentsState,
  (state: State) => state.loaded
);

export const getStudentsError = createSelector(
  getStudentsState,
  (state: State) => state.error
);

export const getAllStudents = createSelector(getStudentsState, (state: State) =>
  selectAll(state)
);

export const getStudentsEntities = createSelector(
  getStudentsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getStudentsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getStudentsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
