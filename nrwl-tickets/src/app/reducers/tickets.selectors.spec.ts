import { getAllTickets } from "./tickets.selectors";

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

  it("should select all tickets", () => {
    const result = getAllTickets.projector(initialState.tickets);
    expect(result.length).toBe(initialState.tickets.ids.length);
    expect(result[0].id).toBe(0);
  });
});
