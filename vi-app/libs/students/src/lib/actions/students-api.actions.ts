import { createAction, props } from '@ngrx/store';
import { StudentsEntity } from '../models/student';

export const loadStudentsSuccess = createAction(
  '[Students/API] Load Students Success',
  props<{ students: StudentsEntity[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students/API] Load Students Failure',
  props<{ error: any }>()
);
