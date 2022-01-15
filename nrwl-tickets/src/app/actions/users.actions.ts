import { createAction, props } from "@ngrx/store";
import { User } from "../models/model";

export const loadUsers = createAction("[Users] Load Users");

export const selectUserById = createAction(
  "[Users] Select User by id",
  props<{ selectedId: string }>()
);

export const loadUser = createAction(
  "[Users] Load User",
  props<{ user: User }>()
);
