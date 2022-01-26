import { createAction, props } from "@ngrx/store";
import { Phone } from "../models/model";

export const loadPhonesOfAddress = createAction(
  "[Phones] Load Phones of Address",
  props<{ addressIds: string[] }>()
  );

export const selectPhoneById = createAction(
  "[Phones] Select Phone by id",
  props<{ selectedId: string }>()
);

export const loadPhone = createAction(
  "[Phones] Load Phone",
  props<{ phone: Phone }>()
);

export const updatePhones = createAction(
  "[Phones] Update Phones",
  props<{ phones: Phone[] }>()
)
