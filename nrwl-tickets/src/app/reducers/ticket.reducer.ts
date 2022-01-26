import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { TicketActions, TicketApiActions } from "../actions";
import { Phone, Ticket } from "../models/model";

export const TICKETS_FEATURE_KEY = "tickets";

export interface TicketState extends EntityState<Ticket> {
  selectedId?: string | number; // which Tickets record has been selected
  loaded: boolean; // has the Tickets list been loaded
  error?: string | null; // last known error (if any)
}
// export interface TicketsPartialState {
//   readonly [TICKETS_FEATURE_KEY]: TicketState;
// }

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState: TicketState = adapter.getInitialState({
  // set initial required properties
  loaded: false
});

//const onFailure = (state, { error }) => ({ ...state, error });

export const reducer = createReducer(
  initialState,
  on(TicketActions.selectTicketById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(TicketActions.selectTicket, (state, { ticket }) =>
    Object.assign({}, state, { selectedId: ticket.id })
  ),
  on(TicketActions.selectTicketByRoute, state => Object.assign({}, state)),
  on(TicketApiActions.resetSelectedTicket, state =>
    Object.assign({}, state, { selectedId: -1 })
  ),
  // on(TicketActions.resetTickets, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(TicketActions.loadTickets, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(TicketApiActions.loadTicketSuccess, (state, { ticket }) =>{
    //Object.assign({}, state, { selectedId: ticket.id })
    //console.log('reducer ticket=', ticket);
    return adapter.setOne(ticket, { ...state, loaded: true, selectedId: ticket.id, error: null })
  }),
  on(TicketApiActions.loadTicketFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(TicketApiActions.loadTicketsSuccess, (state, { tickets }) =>
    adapter.setAll(tickets, { ...state, loaded: true, error: null })
  ),
  on(TicketApiActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(TicketActions.loadFilterTickets, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(TicketApiActions.loadFilterTicketsSuccess, (state, { tickets }) =>
    adapter.setAll(tickets, { ...state, loaded: true, error: null })
  ),
  on(TicketApiActions.loadFilterTicketsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(TicketActions.createTicket, (state, { ticket }) => ({
    ...state,
    loaded: false
  })),
  on(TicketActions.updateTicket, (state, { ticket }) => ({
    ...state,
    loaded: false
  })),

  on(TicketApiActions.createTicketSuccess, (state, { ticket }) =>
    adapter.addOne(ticket, { ...state, selectedId: ticket.id, loaded: true})
    //Object.assign({}, state, { selectedId: ticket.id })
  ),
  // ({
  //   ...state,
  //   error: null,
  //   c
  // })),
  on(TicketApiActions.updateTicketSuccess, (state, { ticket }) => 
    adapter.updateOne({id: ticket.id, changes: ticket }, {...state, loaded: true})
  ), 
  on(TicketApiActions.updateTicketFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(TicketActions.addPhone, (state, { ticketId }) => 
    adapter.updateOne({
      id: ticketId, 
      changes: {
        //phones: phoneAdapter.addOne({id: state.entities[ticketId].phones.ids.length+1, type: '', number: ''}, state.entities[ticketId].phones)
      } 
    },
    {...state, loaded: true})
  ),
  on(TicketActions.deletePhone, (state, { ticketId, id }) => 
    adapter.updateOne({
      id: ticketId, 
      changes: {
        //phones: phoneAdapter.removeOne(id, state.entities[ticketId].phones)
      } 
    },
    {...state, loaded: true})
  ),
    // on(TicketApiActions.addPhoneSuccess, (state, { ticketId, phone }) =>
    //   adapter.updateOne({
    //     id: ticketId, 
    //     changes: {
    //       phoneIds: state.entities[ticketId].phoneIds.concat(phone.id)
    //     }
    //   },
    //   {...state, loaded: true}
    //   )
    // ),
    // on(TicketApiActions.deletePhoneSuccess, (state, { ticketId, id }) =>
    //   adapter.updateOne({
    //     id: ticketId, 
    //     changes: {
    //       phoneIds: state.entities[ticketId].phoneIds.filter(d => d !== id)
    //     }
    //   },
    //   {...state, loaded: true}
    //   )
    // )
);

// export function ticketsReducer(state: TicketState | undefined, action: Action) {
//   return _ticketsReducer(state, action);
// }
