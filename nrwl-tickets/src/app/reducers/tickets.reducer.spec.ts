import { initialTicketsState, ticketsReducer } from "./tickets.reducer";
import { TicketsActions, TicketsApiActions } from "../actions";
import { createAction } from "@ngrx/store";

describe("default", () => {
  it("should return init state when action not found", () => {
    const newState = ticketsReducer(
      undefined,
      createAction("[Tickets] Not Match Action")
    );
    expect(newState).toEqual(initialTicketsState);
  });
});

describe("loadTickets", () => {
  const tickets = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 222,
      completed: false
    },
    {
      id: 2,
      description: "Regiter online",
      assigneeId: 333,
      completed: false
    }
  ];

  it("should return loaded is false", () => {
    const newState = ticketsReducer(
      initialTicketsState,
      TicketsActions.loadTickets
    );
    expect(newState.loaded).toBe(false);
  });

  it("should return loaded is true and error is null if load tickets success", () => {
    const newState = ticketsReducer(
      initialTicketsState,
      TicketsApiActions.loadTicketsSuccess({ tickets })
    );
    expect(newState.loaded).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.ids.length).toBe(tickets.length);
  });

  it("should return loaded is false and error if load tickets fail", () => {
    const error = new Error("http error");
    const newState = ticketsReducer(
      initialTicketsState,
      TicketsApiActions.loadTicketsFailure({ error })
    );
    expect(newState.loaded).toBe(false);
    expect(newState.error.toString()).toContain(error.message);
  });
});
