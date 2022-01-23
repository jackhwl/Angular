import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { UserActions, UserApiActions } from "../actions";
import { User } from "../models/model";

export const USERS_FEATURE_KEY = "users";

export interface State extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // set initial required properties
  loaded: false
});

// const onFailure = (state, { error }) => ({ ...state, error });

export const reducer = createReducer(
  initialState,
  on(UserActions.selectUserById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  //   on(UserActions.selectUser, (state, { user }) =>
  //     Object.assign({}, state, { selectedId: user?.id })
  //   ),
  // on(UserActions.resetUsers, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(UserActions.loadUsers, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(UserApiActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, loaded: true, error: null })
  ),
  on(UserApiActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// export function usersReducer(state: UserState | undefined, action: Action) {
//   return _usersReducer(state, action);
// }
