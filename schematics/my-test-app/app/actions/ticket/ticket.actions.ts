import { createAction, props } from '@ngrx/store';
import { Ticket } from '../models';

export const selectTicketById = createAction(
  '[Tickets] Select Ticket by id',
  props<{ selectedId: string }>()
);

export const selectTicket = createAction(
  '[Tickets] Select Ticket',
  props<{ ticket: Ticket }>()
);

export const loadTickets = createAction('[Tickets] Load Tickets');

// Create Ticket
export const createTicket = createAction(
  '[Tickets] Create Ticket',
  props<{ ticket: Ticket }>()
);

// Update Ticket
export const updateTicket = createAction(
  '[Tickets] Update Ticket',
  props<{ ticket: Ticket }>()
);

// Delete Ticket
export const deleteTicket = createAction(
  '[Tickets] Delete Ticket',
  props<{ ticket: Ticket }>()
);
