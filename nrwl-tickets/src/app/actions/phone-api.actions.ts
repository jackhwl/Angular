import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Phone } from "../models/model";

export const loadPhonesOfAddressSuccess = createAction(
  "[Phones/API] Load Phones of Address Success",
  props<{ phones: Phone[] }>()
);

export const loadPhonesOfAddressFailure = createAction(
  "[Phones/API] Load Phones of Address Failure",
  props<{ error: any }>()
);

export const loadPhoneSuccess = createAction(
  "[Phones/API] Load Phone Success",
  props<{ phone: Phone }>()
);

export const loadPhoneFailure = createAction(
  "[Phones/API] Load Phone Failure",
  props<{ error: any }>()
);

export const updatePhonesSuccess = createAction(
  "[Phones/API] Update Phones Success",
  props<{ phones: Phone[] }>()
);

export const updatePhonesFailure = createAction(
  "[Phones/API] XXXXXXX Update Phones Failure",
  props<{ error: any }>()
);
