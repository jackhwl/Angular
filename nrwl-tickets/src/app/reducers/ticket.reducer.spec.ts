import * as fromTickets from "./ticket.reducer";
import { TicketActions, TicketApiActions } from "../actions";
import { createAction } from "@ngrx/store";
import { Action } from "@ngrx/store";

const ticket = {
  id: null,
  description: "new ticket",
  assigneeId: 111,
  completed: false
};

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

describe("Tickets Reducer default", () => {
  it("should return init state when action not found", () => {
    const newState = fromTickets.ticketsReducer(
      undefined,
      createAction("[Tickets] Not Match Action")
    );
    expect(newState).toEqual(fromTickets.initialTicketsState);
  });
});

describe("Tickets Reducer loadTickets", () => {
  it("should return loaded is false", () => {
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketActions.loadTickets
    );
    expect(newState.loaded).toBe(false);
  });

  it("should return loaded is true and error is null if load tickets success", () => {
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketApiActions.loadTicketsSuccess({ tickets })
    );
    expect(newState.loaded).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.ids.length).toBe(tickets.length);
  });

  it("should return loaded is false and error if load tickets fail", () => {
    const error = new Error("http error");
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketApiActions.loadTicketsFailure({ error })
    );
    expect(newState.loaded).toBe(false);
    expect(newState.error.toString()).toContain(error.message);
  });
});

describe("Tickets Reducer loadFilterTickets", () => {
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
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketActions.loadFilterTickets
    );
    expect(newState.loaded).toBe(false);
  });

  it("should return loaded is true and error is null if loadFilterTickets success", () => {
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketApiActions.loadFilterTicketsSuccess({ tickets })
    );
    expect(newState.loaded).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.ids.length).toBe(tickets.length);
  });

  it("should return loaded is false and error if load tickets fail", () => {
    const error = new Error("http error");
    const newState = fromTickets.ticketsReducer(
      fromTickets.initialTicketsState,
      TicketApiActions.loadFilterTicketsFailure({ error })
    );
    expect(newState.loaded).toBe(false);
    expect(newState.error.toString()).toContain(error.message);
  });
});

describe("Tickets Reducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialTicketsState } = fromTickets;
      const action = {} as Action;
      const state = fromTickets.ticketsReducer(undefined, action);

      expect(state).toBe(initialTicketsState);
    });
  });

  describe("create ticket action", () => {
    it("should set the loaded to false", () => {
      const { initialTicketsState } = fromTickets;
      const action = TicketActions.createTicket({ ticket });
      const state = fromTickets.ticketsReducer(initialTicketsState, action);

      expect(state.loaded).toBe(false);
    });
  });

  describe("update ticket action", () => {
    it("should set the loaded to false", () => {
      const { initialTicketsState } = fromTickets;
      const action = TicketActions.updateTicket({ ticket: tickets[1] });
      const state = fromTickets.ticketsReducer(initialTicketsState, action);

      expect(state.loaded).toBe(false);
    });
  });

  describe("selectTicketById action", () => {
    it("should set the selectedId of ticket state", () => {
      const initialState = fromTickets.ticketsReducer(
        fromTickets.initialTicketsState,
        TicketApiActions.loadTicketsSuccess({ tickets })
      );
      const selectedId = "1";
      const action = TicketActions.selectTicketById({ selectedId });
      const state = fromTickets.ticketsReducer(initialState, action);

      expect(state.selectedId).toBe(selectedId);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("selectTicket action", () => {
    it("should set the selected ticket state", () => {
      const initialState = fromTickets.ticketsReducer(
        fromTickets.initialTicketsState,
        TicketApiActions.loadTicketsSuccess({ tickets })
      );
      const ticket = tickets[1];
      const action = TicketActions.selectTicket({ ticket });
      const state = fromTickets.ticketsReducer(initialState, action);

      expect(state.selectedId).toBe(ticket.id);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("selectTicketByRoute action without Route param", () => {
    it("should set the selectedId to undefined", () => {
      const initialState = fromTickets.ticketsReducer(
        fromTickets.initialTicketsState,
        TicketApiActions.loadTicketsSuccess({ tickets })
      );
      const action = TicketActions.selectTicketByRoute();
      const state = fromTickets.ticketsReducer(initialState, action);

      expect(state.selectedId).toBe(undefined);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("API/resetSelectedTicket action", () => {
    it("should set the selectedId to -1", () => {
      const initialState = fromTickets.ticketsReducer(
        fromTickets.initialTicketsState,
        TicketApiActions.loadTicketsSuccess({ tickets })
      );
      const action = TicketApiActions.resetSelectedTicket();
      const state = fromTickets.ticketsReducer(initialState, action);

      expect(state.selectedId).toBe(-1);
      expect(state.entities).toBe(initialState.entities);
    });
  });

  describe("API/loadFilterTicketsSuccess action", () => {
    it("should return filtered tickets", () => {
      const { initialTicketsState } = fromTickets;
      const action = TicketApiActions.loadFilterTicketsSuccess({ tickets });
      const state = fromTickets.ticketsReducer(initialTicketsState, action);

      expect(state.loaded).toBe(true);
      expect(state.error).toBe(null);
      expect(state.ids).toEqual(tickets.map(t => t.id));
    });
  });

  describe("API/updateTicketFailure action", () => {
    it("should return error object", () => {
      const initialState = fromTickets.ticketsReducer(
        fromTickets.initialTicketsState,
        TicketApiActions.loadTicketsSuccess({ tickets })
      );
      const error = new Error("http error");
      const action = TicketApiActions.updateTicketFailure({ error });
      const state = fromTickets.ticketsReducer(initialState, action);

      expect(state.error).not.toBe(null);
      expect(state.error.toString()).toContain(error.message);
    });
  });
});
