import { Injectable } from "@angular/core";
import { Ticket } from "./backend.service";

import { Action, ActionsSubject, select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";

import * as TicketsSelectors from "../reducers/tickets.selectors";
import * as UsersSelectors from "../reducers/users.selectors";

import { TicketsActions, TicketsApiActions, UsersActions } from "../actions";
import { filter, map } from "rxjs/operators";
import { selectQueryParam } from "../reducers/router.selectors";
import { routerNavigatedAction } from "@ngrx/router-store";

@Injectable()
export class TicketsFacade {
  loaded$ = this.store.pipe(select(TicketsSelectors.getLoaded));
  allTickets$ = this.store.pipe(select(TicketsSelectors.getAllTickets));
  allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedTicket$ = this.store.pipe(select(TicketsSelectors.getSelected));
  selectedTicketByRoute$ = this.store.pipe(
    select(TicketsSelectors.getSelectedByRoute)
  );
  error$ = this.store.pipe(select(TicketsSelectors.getError));
  q$ = this.store.pipe(select(selectQueryParam("q")));

  allTicketVms$ = combineLatest([this.allTickets$, this.allUsers$]).pipe(
    map(([tickets, users]) =>
      tickets.map(ticket => ({
        ...ticket,
        assignees: users.filter(user => user.id === ticket.assigneeId)
      }))
    )
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === routerNavigatedAction.type ||
        action.type === TicketsApiActions.createTicketSuccess({} as any).type ||
        action.type === TicketsApiActions.updateTicketSuccess({} as any).type
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

  selectTicketByRoute() {
    this.dispatch(TicketsActions.selectTicketByRoute());
  }

  loadTickets() {
    this.dispatch(TicketsActions.loadTickets());
  }

  loadFilterTickets(queryStr) {
    this.dispatch(TicketsActions.loadFilterTickets({ queryStr }));
  }

  loadFilterTicketsByRoute() {
    this.dispatch(TicketsActions.loadFilterTicketsByRoute());
  }

  loadUsers() {
    this.dispatch(UsersActions.loadUsers());
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
