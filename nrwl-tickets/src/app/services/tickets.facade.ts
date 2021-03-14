import { Injectable } from "@angular/core";
import { Ticket } from "./backend.service";

import { Action, ActionsSubject, select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";

import * as TicketsSelectors from "../reducers/tickets.selectors";

import { TicketsActions, TicketsApiActions } from "../actions";
import { filter } from "rxjs/operators";

@Injectable()
export class TicketsFacade {
  loaded$ = this.store.pipe(select(TicketsSelectors.getLoaded));
  allTickets$ = this.store.pipe(select(TicketsSelectors.getAllTickets));
  //allUsers$ = this.store.pipe(select(TicketsSelectors.getAllTickets));
  selectedTicket$ = this.store.pipe(select(TicketsSelectors.getSelected));
  error$ = this.store.pipe(select(TicketsSelectors.getError));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === TicketsApiActions.createTicketSuccess({} as any).type ||
        action.type === TicketsApiActions.updateTicketSuccess({} as any).type ||
        action.type === TicketsApiActions.deleteTicketSuccess({} as any).type
    )
  );

  constructor(private store: Store<{}>, private actions$: ActionsSubject) {}

  getAll() {
    this.dispatch(TicketsActions.loadTickets());
  }

  selectTicketById(selectedId: string) {
    this.dispatch(TicketsActions.selectTicketById({ selectedId }));
  }

  selectTicket(ticket: Ticket) {
    this.dispatch(TicketsActions.selectTicket({ ticket }));
  }

  loadTickets() {
    this.dispatch(TicketsActions.loadTickets());
  }

  loadFilterTickets(queryStr) {
    this.dispatch(TicketsActions.loadFilterTickets({ queryStr }));
  }

  createTicket(ticket: Ticket) {
    this.dispatch(TicketsActions.createTicket({ ticket }));
  }

  updateTicket(ticket: Ticket) {
    this.dispatch(TicketsActions.updateTicket({ ticket }));
  }

  deleteTicket(ticket: Ticket) {
    this.dispatch(TicketsActions.deleteTicket({ ticket }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
