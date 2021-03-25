import * as fromUsers from "./users.reducer";
import { UsersActions, UsersApiActions } from "../actions";
import { createAction } from "@ngrx/store";
import { Action } from "@ngrx/store";

const users = [
  { id: 111, name: "Victor" },
  { id: 222, name: "Jack" }
];

describe("Users Reducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialUsersState } = fromUsers;
      const action = {} as Action;
      const state = fromUsers.usersReducer(undefined, action);

      expect(state).toBe(initialUsersState);
    });
  });

  describe("selectUserById action", () => {
    it("should set the selectedId of user state", () => {
      const initialState = fromUsers.usersReducer(
        fromUsers.initialUsersState,
        UsersApiActions.loadUsersSuccess({ users })
      );
      const selectedId = "1";
      const action = UsersActions.selectUserById({ selectedId });
      const state = fromUsers.usersReducer(initialState, action);

      expect(state.selectedId).toBe(selectedId);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("loadUsers actioon", () => {
    it("should return users", () => {
      const { initialUsersState } = fromUsers;
      const action = UsersActions.loadUsers();
      const state = fromUsers.usersReducer(initialUsersState, action);

      expect(state.loaded).toBe(false);
      expect(state.error).toBe(null);
      expect(state.ids).toEqual([]);
    });
  });

  describe("API/loadUsersSuccess action", () => {
    it("should return users", () => {
      const { initialUsersState } = fromUsers;
      const action = UsersApiActions.loadUsersSuccess({ users });
      const state = fromUsers.usersReducer(initialUsersState, action);

      expect(state.loaded).toBe(true);
      expect(state.error).toBe(null);
      expect(state.ids).toEqual(users.map(u => u.id));
    });
  });

  describe("API/loadUsersFailure action", () => {
    it("should return error object", () => {
      const initialState = fromUsers.usersReducer(
        fromUsers.initialUsersState,
        UsersApiActions.loadUsersSuccess({ users })
      );
      const error = new Error("http error");
      const action = UsersApiActions.loadUsersFailure({ error });
      const state = fromUsers.usersReducer(initialState, action);

      expect(state.error).not.toBe(null);
      expect(state.error.toString()).toContain(error.message);
    });
  });
});
