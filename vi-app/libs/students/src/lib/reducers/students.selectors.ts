import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Student } from '../models/student';
import {
  STUDENTS_FEATURE_KEY,
  StudentState,
  StudentsPartialState,
  studentsAdapter
} from './students.reducer';

// Lookup the 'Students' feature state managed by NgRx
export const getStudentsState = createFeatureSelector<
  StudentsPartialState,
  StudentState
>(STUDENTS_FEATURE_KEY);

const { selectAll, selectEntities } = studentsAdapter.getSelectors();

export const getStudentsLoaded = createSelector(
  getStudentsState,
  (state: StudentState) => state.loaded
);

export const getStudentsError = createSelector(
  getStudentsState,
  (state: StudentState) => state.error
);

export const getAllStudents = createSelector(
  getStudentsState,
  (state: StudentState) => selectAll(state)
);

export const getStudentsEntities = createSelector(
  getStudentsState,
  (state: StudentState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getStudentsState,
  (state: StudentState) => state.selectedId
);

const emptyStudent: Student = {
  id: null,
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  schoolName: '',
  year: '',
  graduationDate: ''
};

export const getSelected = createSelector(
  getStudentsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : emptyStudent)
);

export const getLoaded = createSelector(
  getStudentsState,
  (state: StudentState) => state.loaded
);
