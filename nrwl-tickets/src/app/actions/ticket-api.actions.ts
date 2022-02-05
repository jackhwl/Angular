import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Phone, Ticket, TicketBase } from "../models/model";

export const resetSelectedTicket = createAction(
  "[Tickets/API] Reset Selected Tickets"
);

export const loadTicketsSuccess = createAction(
  "[Tickets/API] Load Tickets Success",
  props<{ tickets: Ticket[] }>()
);

export const loadTicketsFailure = createAction(
  "[Tickets/API] Load Tickets Failure",
  props<{ error: any }>()
);

export const loadFilterTicketsSuccess = createAction(
  "[Tickets/API] Load Filter Tickets Success",
  props<{ tickets: Ticket[] }>()
);

export const loadFilterTicketsFailure = createAction(
  "[Tickets/API] Load Filter Tickets Failure",
  props<{ error: any }>()
);

export const loadTicketSuccess = createAction(
  "[Tickets/API] Load Ticket Success",
  props<{ ticket: Ticket }>()
);

export const loadTicketFailure = createAction(
  "[Tickets/API] Load Ticket Failure",
  props<{ error: any }>()
);

export const notifyLoadTicketsSuccess = createAction(
  "[Toastr Notification/API] Display Load Tickets Success",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const createTicketSuccess = createAction(
  "[Tickets/API] Create Ticket Success",
  props<{ ticket: Ticket }>()
);

export const notifyCreateTicketSuccess = createAction(
  "[Toastr Notification/API] Create Ticket Success",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const createTicketFailure = createAction(
  "[Tickets/API] Create Ticket Failure",
  props<{ error: any }>()
);

export const updateTicketSuccess = createAction(
  "[Tickets/API] Update Ticket Success",
  props<{ ticket: TicketBase }>()
);
export const upsertTicketSuccess = createAction(
  "[Tickets/API] Upsert Ticket Success",
  props<{ ticket: Ticket }>()
);
export const upsertTicketFailure = createAction(
  "[Tickets/API] Upsert Ticket Failure",
  props<{ error: any }>()
);
export const notifyUpdateTicketSuccess = createAction(
  "[Toastr Notification/API] Update Ticket Success",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const updateTicketFailure = createAction(
  "[Tickets/API] Update Ticket Failure",
  props<{ error: any }>()
);

export const addPhoneSuccess = createAction(
  "[Tickets/API] Add Phone Success",
  props<{ ticketId: string, phone: Phone }>()
);

export const notifyAddPhoneSuccess = createAction(
  "[Toastr Notification/API] Add Phone Success",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const addPhoneFailure = createAction(
  "[Tickets/API] Add Phone Failure",
  props<{ error: any }>()
);

export const notifyUpdateTicketFailure = createAction(
  "[Toastr Notification/API] Update Ticket Failure",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const deleteTicketSuccess = createAction(
  "[Tickets/API] Delete Ticket Success",
  props<{ ticket: Ticket }>()
);

export const notifyDeleteTicketSuccess = createAction(
  "[Toastr Notification/API] Delete Ticket Success",
  props<{ title: string; description: string; interpolateParams?: Object }>()
);

export const deleteTicketFailure = createAction(
  "[Tickets/API] Delete Ticket Failure",
  props<{ error: any }>()
);

export const deletePhoneSuccess = createAction(
  "[Tickets/API] Delete Phone Success",
  props<{ ticketId: string, id: Number  }>()
);

export const deletePhoneFailure = createAction(
  "[Tickets/API] Delete Phone Failure",
  props<{ error: any }>()
);

export const updateAddressesSuccess = createAction(
  "[Tickets/API] Update Addresses Success",
  props<{ ticket: Update<Ticket> }>()
);