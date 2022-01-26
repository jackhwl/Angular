import { createAction, props } from "@ngrx/store";
import { Address } from "../models/model";

export const loadAddressesOfTicketSuccess = createAction(
    "[Addresses/API] Load Addresses of Ticket Success",
    props<{ addresses: Address[] }>()
);

export const loadAddressesOfTicketFailure = createAction(
    "[Addresses/API] Load Addresses of Ticket Failure",
    props<{ error: any }>()
);
  