import { createAction, props } from "@ngrx/store";
import { Ticket_vm } from "../models/model";

export const opened = createAction(
  "[Ticket Detail Page] Opened"
);

export const updateTicketVm = createAction(
  "[Ticket Detail Page] Update Ticket-vm",
  props<{ ticketVm: Ticket_vm }>()
);