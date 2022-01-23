import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { adapter } from "./phone.reducer";
import { State } from "./phone.reducer";

export const getPhoneState = createSelector(
    getTicketModuleState,
    (state: TicketModuleState) => state.phones
);
  
const { selectAll, selectEntities } = adapter.getSelectors();

export const getAllPhones = createSelector(getPhoneState, (state: State) =>
  selectAll(state)
);

export const getPhoneEntities = createSelector(
    getPhoneState,
    (state: State) => selectEntities(state)
);

