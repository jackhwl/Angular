import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student';

export const selectStudentById = createAction(
  '[Students] Select Student by id',
  props<{ selectedId: string }>()
);

export const selectStudent = createAction(
  '[Students] Select Student',
  props<{ student: Student }>()
);

export const loadStudents = createAction('[Students] Load Students');

export const loadStudent = createAction(
  '[Students] Load Student',
  props<{ studentId: Student }>()
);

// Create Student
export const createStudent = createAction(
  '[Students] Create Student',
  props<{ student: Student }>()
);

// Update Student
export const updateStudent = createAction(
  '[Students] Update Student',
  props<{ student: Student }>()
);

// Delete Student
export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{ student: Student }>()
);

export const deleteStudentCancelled = createAction(
  '[Students] Delete Student Cancelled'
);
