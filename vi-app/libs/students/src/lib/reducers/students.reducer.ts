import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { StudentsActions, StudentsApiActions } from '../actions';
import { Student } from '../models/student';

export const STUDENTS_FEATURE_KEY = 'students';

export interface StudentState extends EntityState<Student> {
  selectedId?: string | number; // which Students record has been selected
  loaded: boolean; // has the Students list been loaded
  error?: string | null; // last known error (if any)
}

export interface StudentsPartialState {
  readonly [STUDENTS_FEATURE_KEY]: StudentState;
}

export const studentsAdapter: EntityAdapter<Student> = createEntityAdapter<
  Student
>();

export const initialStudentsState: StudentState = studentsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _studentsReducer = createReducer(
  initialStudentsState,
  on(StudentsActions.selectStudentById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(StudentsActions.selectStudent, (state, { student }) =>
    Object.assign({}, state, { selectedId: student.id })
  ),
  on(StudentsApiActions.resetSelectedStudent, state =>
    Object.assign({}, state, { selectedId: -1 })
  ),
  // on(StudentsActions.resetStudents, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(StudentsActions.loadStudents, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(StudentsApiActions.loadStudentsSuccess, (state, { students }) =>
    studentsAdapter.setAll(students, { ...state, loaded: true, error: null })
  ),
  on(StudentsApiActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // on(StudentsApiActions.createStudentSuccess, (state, { student }) =>
  //   Object.assign({}, state, { selectedId: student.id })
  // ),
  // ({
  //   ...state,
  //   error: null,
  //   selectedId: student.id
  // })),
  on(StudentsApiActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    error: null
  })),
  on(StudentsApiActions.updateStudentFailure, (state, { error }) => ({
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
