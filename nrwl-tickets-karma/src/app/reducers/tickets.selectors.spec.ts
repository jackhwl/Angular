import {
  getTicketsEntities,
  getTicketsState,
  getLoaded,
  getError,
  getSelectedId,
  getSelected,
  getAllTickets,
  getSelectedByRoute,
  emptyTicket
} from "./tickets.selectors";

describe("Tickets Selectors", () => {
  const initialState = {
    tickets: {
      ids: [0, 1],
      entities: {
        0: {
          id: 0,
          description: "Install a monitor arm",
          assigneeId: 111,
          completed: false
        },
        1: {
          id: 1,
          description: "Move the desk to the new location",
          assigneeId: 111,
          completed: false
        }
      },
      error: null,
      loaded: false,
      selectedId: null
    }
  };
  const initialTicketModuleState = {
    users: {},
    tickets: initialState.tickets
  };

  it("should return ticket state", () => {
    const result = getTicketsState.projector(initialTicketModuleState);
    expect(result).toEqual(initialState.tickets);
  });

  it("should return ticket entities", () => {
    const result = getTicketsEntities.projector(initialState.tickets);
    expect(result).toBe(initialState.tickets.entities);
  });

  it("should select all tickets", () => {
    const result = getAllTickets.projector(initialState.tickets);
    expect(result.length).toBe(initialState.tickets.ids.length);
    expect(result[0].id).toBe(0);
  });

  it("should return selectedId", () => {
    const result = getSelectedId.projector(initialState);
    expect(result ?? null).toBe(initialState.tickets.selectedId);
  });

  it("should select ticket by id", () => {
    const result = getSelected.projector(initialState.tickets.entities, 1);
    expect(result).toBe(initialState.tickets.entities[1]);
  });

  it("should return empty ticket if id is null", () => {
    const result = getSelected.projector(initialState.tickets.entities, null);
    expect(result).toBe(emptyTicket);
  });

  it("should select ticket by route", () => {
    const result = getSelectedByRoute.projector(initialState.tickets.entities, {
      id: 1
    });
    expect(result).toBe(initialState.tickets.entities[1]);
  });

  it("should return empty ticket if route param is null", () => {
    const result = getSelectedByRoute.projector(initialState.tickets.entities, {
      id: null
    });
    expect(result).toBe(emptyTicket);
  });

  it("should return load", () => {
    const result = getLoaded.projector(initialState);
    expect(result ?? false).toBe(initialState.tickets.loaded);
  });

  it("should return error", () => {
    const result = getError.projector(initialState);
    expect(result ?? null).toBe(initialState.tickets.error);
  });
});
