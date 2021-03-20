import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../services/backend.service";
import {
  USERS_FEATURE_KEY,
  UserState,
  UsersPartialState,
  usersAdapter
} from "./users.reducer";

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<
  UsersPartialState,
  UserState
>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  getUsersState,
  (state: UserState) => state.loaded
);

export const getUsersError = createSelector(
  getUsersState,
  (state: UserState) => state.error
);

export const getAllUsers = createSelector(getUsersState, (state: UserState) =>
  selectAll(state)
);

export const getUsersEntities = createSelector(
  getUsersState,
  (state: UserState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getUsersState,
  (state: UserState) => state.selectedId
);

const emptyUser: User = {
  id: null,
  name: ""
};

export const getSelected = createSelector(
  getUsersEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId !== null ? entities[selectedId] : emptyUser
);

export const getLoaded = createSelector(
  getUsersState,
  (state: UserState) => state.loaded
);

export const getError = createSelector(
  getUsersState,
  (state: UserState) => state?.error
);
