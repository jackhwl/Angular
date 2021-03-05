import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StudentsActions from '../actions/students.actions';
import { StudentsEntity } from '../models/student';

export const STUDENTS_FEATURE_KEY = 'students';

export interface StudentState extends EntityState<StudentsEntity> {
  selectedId?: string | number; // which Students record has been selected
  loaded: boolean; // has the Students list been loaded
  error?: string | null; // last known error (if any)
}

export interface StudentsPartialState {
  readonly [STUDENTS_FEATURE_KEY]: StudentState;
}

export const studentsAdapter: EntityAdapter<
  StudentsEntity
> = createEntityAdapter<StudentsEntity>();

export const initialStudentsState: StudentState = studentsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false
  }
);

const _studentsReducer = createReducer(
  initialStudentsState,
  on(StudentsActions.loadStudents, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) =>
    studentsAdapter.setAll(students, { ...state, loaded: true })
  ),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function studentsReducer(
  state: StudentState | undefined,
  action: Action
) {
  return _studentsReducer(state, action);
}
