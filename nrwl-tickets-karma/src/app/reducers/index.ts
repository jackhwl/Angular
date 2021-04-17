import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";

import * as fromTicket from "./tickets.reducer";
import * as fromUser from "./users.reducer";

export const TICKETMODULE_FEATURE_KEY = "ticketModule";

export interface TicketModuleState {
  users: fromUser.UserState;
  tickets: fromTicket.TicketState;
}

export interface State {
  //extends fromRoot.State
  [TICKETMODULE_FEATURE_KEY]: TicketModuleState;
}

export const reducers: ActionReducerMap<TicketModuleState, any> = {
  users: fromUser.usersReducer,
  tickets: fromTicket.ticketsReducer
};

export const getTicketModuleState = createFeatureSelector<
  State,
  TicketModuleState
>(TICKETMODULE_FEATURE_KEY);
