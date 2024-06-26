import { createAction, props } from "@ngrx/store";
import { Ticket } from "../models/model";

export const upsertTicket = createAction(
  "[Tickets] Upsert Ticket",
  props<{ ticket: Ticket }>()
);

export const deleteTicket = createAction(
  "[Tickets] Delete Ticket",
  props<{ id: string }>()
);


// export const selectTicketById = createAction(
//   "[Tickets] Select Ticket by id",
//   props<{ selectedId: string }>()
// );

// export const selectTicket = createAction(
//   "[Tickets] Select Ticket",
//   props<{ ticket: Ticket }>()
// );

// export const selectTicketByRoute = createAction(
//   "[Tickets] Select Ticket By Route"
// );

// export const loadTickets = createAction("[Tickets] Load Tickets");

// export const loadTicket = createAction(
//   "[Tickets] Load Ticket",
//   props<{ ticket: Ticket }>()
// );
// export const loadFilterTickets = createAction(
//   "[Tickets] Load Filtered Ticket",
//   props<{ queryStr: string }>()
// );

// export const loadFilterTicketsByRoute = createAction(
//   "[Tickets] Load Filtered Ticket By Route"
// );


// // Create Ticket
// export const createTicket = createAction(
//   "[Tickets] Create Ticket",
//   props<{ ticket: Ticket }>()
// );

// // Update Ticket
// export const updateTicket = createAction(
//   "[Tickets] Update Ticket",
//   props<{ ticket: Ticket }>()
// );


// export const deleteTicketCancelled = createAction(
//   "[Tickets] Delete Ticket Cancelled"
// );

// // Add Phone
// export const addPhone = createAction(
//   "[Tickets] Add Phone",
//   props<{ ticketId: string }>()
// );

// export const addPhone2 = createAction(
//   "[Tickets] Add Phone2",
//   props<{ test: string }>()
// );

// export const deletePhone = createAction(
//   "[Tickets] Delete Phone",
//   props<{ ticketId: string, id: number }>()
// );