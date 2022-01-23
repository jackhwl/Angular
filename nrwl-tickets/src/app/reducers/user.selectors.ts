import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { User } from "../models/model";

import {
  USERS_FEATURE_KEY,
  UserState,
  UsersPartialState,
  usersAdapter
} from "./user.reducer";

// Lookup the 'Users' feature state managed by NgRx
// export const getUsersState = createFeatureSelector<
//   UsersPartialState,
//   UserState
// >(USERS_FEATURE_KEY);

export const getUsersState = createSelector(
  getTicketModuleState,
  (state: TicketModuleState) => state.users
);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

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

export const emptyUser: User = {
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
  (state: UserState) => state.error
);
