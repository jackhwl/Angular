import { createAction, props } from "@ngrx/store";
import { User } from "../services/backend.service";

export const loadUsersSuccess = createAction(
  "[Users/API] Load Users Success",
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  "[Users/API] Load Users Failure",
  props<{ error: any }>()
);

export const loadUserSuccess = createAction(
  "[Users/API] Load User Success",
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  "[Users/API] Load User Failure",
  props<{ error: any }>()
);
