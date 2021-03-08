import { createAction, props } from '@ngrx/store';
import { Student as StudentsEntity } from '../models/student';

export const loadStudentsSuccess = createAction(
  '[Students/API] Load Students Success',
  props<{ students: StudentsEntity[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students/API] Load Students Failure',
  props<{ error: any }>()
);

export const notifyLoadStudentsSuccess = createAction(
  '[Toastr Notification/API] Display Load Students Success',
  props<{ title: string; description: string; interpolateParams?: Object }>()
);
