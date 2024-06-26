import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";

import * as fromTicket from "./ticket.reducer";
import * as fromUser from "./user.reducer";
import * as fromPhone from "./phone.reducer";
import * as fromAddress from "./address.reducer";

export const TICKETMODULE_FEATURE_KEY = "ticketModule";
export const TICKETMODULE_ROUTE_KEY = "tickets";

export interface TicketModuleState {
  phones: fromPhone.State;
  users: fromUser.State;
  tickets: fromTicket.TicketState;
  addresses: fromAddress.State;
}

export interface State {
  //extends fromRoot.State
  [TICKETMODULE_FEATURE_KEY]: TicketModuleState;
}

export const reducers: ActionReducerMap<TicketModuleState, any> = {
  [fromPhone.PHONES_FEATURE_KEY]: fromPhone.reducer,
  [fromUser.USERS_FEATURE_KEY]: fromUser.reducer,
  [fromTicket.TICKETS_FEATURE_KEY]: fromTicket.reducer,
  [fromAddress.addressesFeatureKey]: fromAddress.reducer
};

export const getTicketModuleState = createFeatureSelector<TicketModuleState>(TICKETMODULE_FEATURE_KEY);
