import { createAction, props } from "@ngrx/store";

export const opened = createAction(
  "[Ticket List Page] Opened"
);

export const filterParamChanged = createAction(
  "[Ticket List Page] FIilter Param Changed",
  props<{ q: string }>()
);

