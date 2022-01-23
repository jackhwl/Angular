import { createAction, props } from "@ngrx/store";
import { Address } from "../models/model";

export const loadAddressesOfTicketSuccess = createAction(
    "[Addresses] Load Addresses of Ticket Success",
    props<{ addresses: Address[] }>()
);

export const loadAddressesOfTicketFailure = createAction(
    "[Phones/API] Load Addresses of Ticket Failure",
    props<{ error: any }>()
);
  