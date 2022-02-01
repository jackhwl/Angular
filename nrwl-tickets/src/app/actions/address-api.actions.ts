import { Update } from "@ngrx/entity";
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
  
export const updateAddressesSuccess = createAction(
    "[Addresses/API] Update Addresses Success",
    props<{ addresses: Update<Address>[] }>()
);
  
export const updateAddressesFailure = createAction(
    "[Addresses/API] XXXXXXX Update Addresses Failure",
    props<{ error: any }>()
);
  
export const addNewPhonesSuccess = createAction(
    "[Addresses/API] Add new phone to Address Success",
    props<{ addresses: Partial<Address>[] }>()
);