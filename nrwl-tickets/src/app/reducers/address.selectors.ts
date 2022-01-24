import { createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { adapter, State } from "./address.reducer";

export const getAddressState = createSelector(
    getTicketModuleState,
    (state: TicketModuleState) => state.addresses
);
  
const { selectAll, selectEntities } = adapter.getSelectors();

export const getAllAddresses = createSelector(
    getAddressState, 
    (state: State) => selectAll(state)
);

export const getAddressEntities = createSelector(
    getAddressState,
    (state: State) => selectEntities(state)
);

