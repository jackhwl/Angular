import { createAction, props, union } from '@ngrx/store';
import { Credentials } from '@wl/api-interfaces';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Credentials }>()
);

export type LoginPageActionsUnion = ReturnType<typeof login>;
