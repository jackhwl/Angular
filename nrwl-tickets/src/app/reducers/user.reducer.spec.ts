import * as fromUsers from "./user.reducer";
import { UserActions, UserApiActions } from "../actions";
import { createAction } from "@ngrx/store";
import { Action } from "@ngrx/store";

const users = [
  { id: 111, name: "Victor" },
  { id: 222, name: "Jack" }
];

describe("Users Reducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState: initialUsersState } = fromUsers;
      const action = {} as Action;
      const state = fromUsers.reducer(undefined, action);

      expect(state).toBe(initialUsersState);
    });
  });

  describe("selectUserById action", () => {
    it("should set the selectedId of user state", () => {
      const initialState = fromUsers.reducer(
        fromUsers.initialState,
        UserApiActions.loadUsersSuccess({ users })
      );
      const selectedId = "1";
      const action = UserActions.selectUserById({ selectedId });
      const state = fromUsers.reducer(initialState, action);

      expect(state.selectedId).toBe(selectedId);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("loadUsers actioon", () => {
    it("should return users", () => {
      const { initialState: initialUsersState } = fromUsers;
      const action = UserActions.loadUsers();
      const state = fromUsers.reducer(initialUsersState, action);

      expect(state.loaded).toBe(false);
      expect(state.error).toBe(null);
      expect(state.ids).toEqual([]);
    });
  });

  describe("API/loadUsersSuccess action", () => {
    it("should return users", () => {
      const { initialState: initialUsersState } = fromUsers;
      const action = UserApiActions.loadUsersSuccess({ users });
      const state = fromUsers.reducer(initialUsersState, action);

      expect(state.loaded).toBe(true);
      expect(state.error).toBe(null);
      expect(state.ids).toEqual(users.map(u => u.id));
    });
  });

  describe("API/loadUsersFailure action", () => {
    it("should return error object", () => {
      const initialState = fromUsers.reducer(
        fromUsers.initialState,
        UserApiActions.loadUsersSuccess({ users })
      );
      const error = new Error("http error");
      const action = UserApiActions.loadUsersFailure({ error });
      const state = fromUsers.reducer(initialState, action);

      expect(state.error).not.toBe(null);
      expect(state.error.toString()).toContain(error.message);
    });
  });
});
