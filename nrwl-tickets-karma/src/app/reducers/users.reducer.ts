import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { UsersActions, UsersApiActions } from "../actions";
import { User } from "../services/backend.service";

export const USERS_FEATURE_KEY = "users";

export interface UserState extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UserState;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUsersState: UserState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

// const onFailure = (state, { error }) => ({ ...state, error });

const _usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.selectUserById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  //   on(UsersActions.selectUser, (state, { user }) =>
  //     Object.assign({}, state, { selectedId: user?.id })
  //   ),
  // on(UsersActions.resetUsers, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(UsersActions.loadUsers, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(UsersApiActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true, error: null })
  ),
  on(UsersApiActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function usersReducer(state: UserState | undefined, action: Action) {
  return _usersReducer(state, action);
}
