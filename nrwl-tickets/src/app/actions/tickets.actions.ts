import { createAction, props } from "@ngrx/store";
import { Ticket } from "../services/backend.service";

export const selectTicketById = createAction(
  "[Tickets] Select Ticket by id",
  props<{ selectedId: string }>()
);

export const selectTicket = createAction(
  "[Tickets] Select Ticket",
  props<{ ticket: Ticket }>()
);

export const selectTicketByRoute = createAction(
  "[Tickets] Select Ticket By Route"
);

export const loadTickets = createAction("[Tickets] Load Tickets");

export const loadTicket = createAction(
  "[Tickets] Load Ticket",
  props<{ ticket: Ticket }>()
);
export const loadFilterTickets = createAction(
  "[Tickets] Load Filtered Ticket",
  props<{ queryStr: string }>()
);

export const loadFilterTicketsByRoute = createAction(
  "[Tickets] Load Filtered Ticket By Route"
);

export const loadFilterTicketsSuccess = createAction(
  "[Tickets/API] Load Filter Tickets Success",
  props<{ tickets: Ticket[] }>()
);

export const loadFilterTicketsFailure = createAction(
  "[Tickets/API] Load Filter Tickets Failure",
  props<{ error: any }>()
);

// Create Ticket
export const createTicket = createAction(
  "[Tickets] Create Ticket",
  props<{ ticket: Ticket }>()
);

// Update Ticket
export const updateTicket = createAction(
  "[Tickets] Update Ticket",
  props<{ ticket: Ticket }>()
);

// Delete Ticket
export const deleteTicket = createAction(
  "[Tickets] Delete Ticket",
  props<{ ticket: Ticket }>()
);

export const deleteTicketCancelled = createAction(
  "[Tickets] Delete Ticket Cancelled"
);

// Add Phone
export const addPhone = createAction(
  "[Tickets] Add Phone",
  props<{ ticket: Ticket }>()
);

export const addPhone2 = createAction(
  "[Tickets] Add Phone2",
  props<{ test: string }>()
);
