import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { TicketsActions, TicketsApiActions } from "../actions";
import { Ticket } from "../services/backend.service";

export const TICKETS_FEATURE_KEY = "tickets";

export interface TicketState extends EntityState<Ticket> {
  selectedId?: string | number; // which Tickets record has been selected
  loaded: boolean; // has the Tickets list been loaded
  error?: string | null; // last known error (if any)
}

export interface TicketsPartialState {
  readonly [TICKETS_FEATURE_KEY]: TicketState;
}

export const ticketsAdapter: EntityAdapter<Ticket> = createEntityAdapter<
  Ticket
>();

export const initialTicketsState: TicketState = ticketsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

//const onFailure = (state, { error }) => ({ ...state, error });

const _ticketsReducer = createReducer(
  initialTicketsState,
  on(TicketsActions.selectTicketById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(TicketsActions.selectTicket, (state, { ticket }) =>
    Object.assign({}, state, { selectedId: ticket.id })
  ),
  on(TicketsActions.selectTicketByRoute, state => Object.assign({}, state)),
  on(TicketsApiActions.resetSelectedTicket, state =>
    Object.assign({}, state, { selectedId: -1 })
  ),
  // on(TicketsActions.resetTickets, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(TicketsActions.loadTickets, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(TicketsApiActions.loadTicketsSuccess, (state, { tickets }) =>
    ticketsAdapter.setAll(tickets, { ...state, loaded: true, error: null })
  ),
  on(TicketsApiActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(TicketsActions.loadFilterTickets, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(TicketsApiActions.loadFilterTicketsSuccess, (state, { tickets }) =>
    ticketsAdapter.setAll(tickets, { ...state, loaded: true, error: null })
  ),
  on(TicketsApiActions.loadFilterTicketsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(TicketsActions.createTicket, (state, { ticket }) => ({
    ...state,
    loaded: false
  })),
  on(TicketsActions.updateTicket, (state, { ticket }) => ({
    ...state,
    loaded: false
  })),

  // on(TicketsApiActions.createTicketSuccess, (state, { ticket }) =>
  //   Object.assign({}, state, { selectedId: ticket.id })
  // ),
  // ({
  //   ...state,
  //   error: null,
  //   selectedId: ticket.id
  // })),
  // on(TicketsApiActions.updateTicketSuccess, (state, { ticket }) => ({
  //   ...state,
  //   error: null
  // })),
  on(TicketsApiActions.updateTicketFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(TicketsActions.addPhone, (state, { ticket }) => ({
    ...state,
    loaded: false
  })),
  on(TicketsApiActions.addPhoneSuccess, (state, { ticket }) =>
    ticketsAdapter.setOne(ticket, state)
  )
);

export function ticketsReducer(state: TicketState | undefined, action: Action) {
  return _ticketsReducer(state, action);
}
