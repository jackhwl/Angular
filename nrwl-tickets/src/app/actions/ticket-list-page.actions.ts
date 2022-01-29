import { createAction, props } from "@ngrx/store";
import { Ticket_vm } from "../models/model";

export const opened = createAction(
  "[Ticket List Page] Opened"
);

export const filterParamChanged = createAction(
  "[Ticket List Page] FIilter Param Changed",
  props<{ q: string }>()
);

