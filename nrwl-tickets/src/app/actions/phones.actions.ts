import { createAction, props } from "@ngrx/store";
import { Phone } from "../models/model";

export const loadPhones = createAction("[Phones] Load Phones");

export const selectPhoneById = createAction(
  "[Phones] Select Phone by id",
  props<{ selectedId: string }>()
);

export const loadPhone = createAction(
  "[Phones] Load Phone",
  props<{ phone: Phone }>()
);