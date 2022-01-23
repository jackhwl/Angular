import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { emptyTicket } from "../services/backend.service";
import {
  TICKETS_FEATURE_KEY,
  TicketState,
  adapter
} from "./ticket.reducer";
import { selectRouteParams } from "./router.selectors";

// Lookup the 'Tickets' feature state managed by NgRx
// export const getTicketsState = createFeatureSelector<
//   TicketsPartialState,
//   TicketState
// >(TICKETS_FEATURE_KEY);
export const getTicketsState = createSelector(
  getTicketModuleState,
  (state: TicketModuleState) => state.tickets
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const getAllTickets = createSelector(
  getTicketsState,
  (state: TicketState) => selectAll(state)
);

export const getTicketsEntities = createSelector(
  getTicketsState,
  (state: TicketState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTicketsState,
  (state: TicketState) => state.selectedId
);

export const getSelected = createSelector(
  getTicketsEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId !== null ? entities[selectedId] : emptyTicket
);

export const getSelectedByRoute = createSelector(
  getTicketsEntities,
  selectRouteParams,
  (entities, { id }) => (id in entities ? entities[id] : emptyTicket)
);

export const getLoaded = createSelector(
  getTicketsState,
  (state: TicketState) => state.loaded
);

export const getError = createSelector(
  getTicketsState,
  (state: TicketState) => state.error
);
