import { createAction, props } from "@ngrx/store";
import { Address } from "../models/model";

export const loadAddressesOfTicket = createAction(
    "[Addresses] Load Addresses of Ticket",
    props<{ ticketId: number }>()
);
