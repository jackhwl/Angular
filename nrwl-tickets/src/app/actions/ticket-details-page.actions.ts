import { createAction, props } from "@ngrx/store";
import { Ticket_vm } from "../models/model";

export const opened = createAction(
  "[Ticket Detail Page] Opened"
);

export const upsertTicketVm = createAction(
  "[Ticket Detail Page] Upsert Ticket-vm",
  props<{ ticketVm: Ticket_vm }>()
);

export const deleteTicketVm = createAction(
  "[Ticket Detail Page] Delete Ticket-vm",
  props<{ ticketVm: Ticket_vm }>()
);