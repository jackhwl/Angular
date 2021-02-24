import { createAction, props } from '@ngrx/store';
import { Credentials } from '@vi/api-interfaces';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Credentials }>()
);

export type LoginPageActionsUnion = ReturnType<typeof login>;
