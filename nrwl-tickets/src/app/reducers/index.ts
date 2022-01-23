import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";

import * as fromTicket from "./ticket.reducer";
import * as fromUser from "./user.reducer";
import * as fromPhone from "./phone.reducer";

export const TICKETMODULE_FEATURE_KEY = "ticketModule";

export interface TicketModuleState {
  phones: fromPhone.PhoneState;
  users: fromUser.UserState;
  tickets: fromTicket.TicketState;
  //addresses: 
}

export interface State {
  //extends fromRoot.State
  [TICKETMODULE_FEATURE_KEY]: TicketModuleState;
}

export const reducers: ActionReducerMap<TicketModuleState, any> = {
  phones: fromPhone.phonesReducer,
  users: fromUser.usersReducer,
  tickets: fromTicket.ticketsReducer
};

export const getTicketModuleState = createFeatureSelector<TicketModuleState>(TICKETMODULE_FEATURE_KEY);
