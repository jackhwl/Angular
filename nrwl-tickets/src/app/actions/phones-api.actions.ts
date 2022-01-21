import { createAction, props } from "@ngrx/store";
import { Phone } from "../models/model";

export const loadPhonesSuccess = createAction(
  "[Phones/API] Load Phones Success",
  props<{ phones: Phone[] }>()
);

export const loadPhonesFailure = createAction(
  "[Phones/API] Load Phones Failure",
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
