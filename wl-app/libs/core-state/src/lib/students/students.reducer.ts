import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StudentsActions from './students.actions';
import { StudentsEntity } from './students.models';

export const STUDENTS_FEATURE_KEY = 'students';

export interface State extends EntityState<StudentsEntity> {
  selectedId?: string | number; // which Students record has been selected
  loaded: boolean; // has the Students list been loaded
  error?: string | null; // last known error (if any)
}

export interface StudentsPartialState {
  readonly [STUDENTS_FEATURE_KEY]: State;
}

export const studentsAdapter: EntityAdapter<StudentsEntity> = createEntityAdapter<
  StudentsEntity
>();

export const initialState: State = studentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const studentsReducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) =>
    studentsAdapter.setAll(students, { ...state, loaded: true })
  ),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return studentsReducer(state, action);
}
