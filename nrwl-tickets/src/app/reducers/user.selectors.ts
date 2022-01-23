import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { User } from "../models/model";

import {
  USERS_FEATURE_KEY,
  State,
  adapter
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

const { selectAll, selectEntities } = adapter.getSelectors();

export const getAllUsers = createSelector(getUsersState, (state: State) =>
  selectAll(state)
);

export const getUsersEntities = createSelector(
  getUsersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getUsersState,
  (state: State) => state.selectedId
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
  (state: State) => state.loaded
);

export const getError = createSelector(
  getUsersState,
  (state: State) => state.error
);
