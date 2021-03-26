import {
  getUsersEntities,
  getUsersState,
  getLoaded,
  getError,
  getSelectedId,
  getSelected,
  getAllUsers
} from "./users.selectors";

describe("Users Selectors", () => {
  const initialState = {
    users: {
      ids: [0, 1],
      entities: {
        0: {
          id: 0,
          name: "Victor"
        },
        1: {
          id: 1,
          name: "Jack"
        }
      },
      error: null,
      loaded: false,
      selectedId: null
    }
  };
  const initialTicketModuleState = {
    tickets: {},
    users: initialState.users
  };

  it("should return user state", () => {
    const result = getUsersState.projector(initialTicketModuleState);
    expect(result).toEqual(initialState.users);
  });

  it("should return user entities", () => {
    const result = getUsersEntities.projector(initialState.users);
    expect(result).toBe(initialState.users.entities);
  });

  it("should select all users", () => {
    const result = getAllUsers.projector(initialState.users);
    expect(result.length).toBe(initialState.users.ids.length);
    expect(result[0].id).toBe(0);
  });

  it("should return selectedId", () => {
    const result = getSelectedId.projector(initialState);
    expect(result ?? null).toBe(initialState.users.selectedId);
  });

  it("should select user by id", () => {
    const result = getSelected.projector(initialState.users.entities, 1);
    expect(result).toBe(initialState.users.entities[1]);
  });

  it("should return load", () => {
    const result = getLoaded.projector(initialState);
    expect(result ?? false).toBe(initialState.users.loaded);
  });

  it("should return error", () => {
    const result = getError.projector(initialState);
    expect(result ?? null).toBe(initialState.users.error);
  });
});
