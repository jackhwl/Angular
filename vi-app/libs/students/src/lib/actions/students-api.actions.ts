import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student';

export const loadStudentsSuccess = createAction(
  '[Students/API] Load Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students/API] Load Students Failure',
  props<{ error: any }>()
);

export const notifyLoadStudentsSuccess = createAction(
  '[Toastr Notification/API] Display Load Students Success',
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const createStudentSuccess = createAction(
  '[Students/API] Create Student Success',
  props<{ student: Student }>()
);

export const createStudentFailure = createAction(
  '[Students/API] Create Student Failure',
  props<{ error: any }>()
);

export const updateStudentSuccess = createAction(
  '[Students/API] Update Student Success',
  props<{ student: Student }>()
);

export const updateStudentFailure = createAction(
  '[Students/API] Update Student Failure',
  props<{ error: any }>()
);

export const deleteStudentSuccess = createAction(
  '[Students/API] Delete Student Success',
  props<{ student: Student }>()
);

export const deleteStudentFailure = createAction(
  '[Students/API] Delete Student Failure',
  props<{ error: any }>()
);
