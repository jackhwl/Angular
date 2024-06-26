import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";
import { Action, select, Store } from "@ngrx/store";

import { TicketVm } from "../models/ticketvm";
import { Ticket, User } from "./backend.service";
import * as UsersSelectors from "../reducers/users.selectors";
import {
  selectQueryParam,
  selectRouteParam
} from "../reducers/router.selectors";
import * as TicketsSelectors from "../reducers/tickets.selectors";
import { TicketsActions, UsersActions } from "../actions";

@Injectable()
export class TicketsFacade {
  routerRouteParamId$: Observable<string> = this.store.pipe(
    select(selectRouteParam("id"))
  );
  routerQueryParam$: Observable<string> = this.store.pipe(
    select(selectQueryParam("q"))
  );
  error$: Observable<string | null> = this.store.pipe(
    select(TicketsSelectors.getError)
  );
  loaded$: Observable<boolean> = this.store.pipe(
    select(TicketsSelectors.getLoaded)
  );
  allUsers$: Observable<User[]> = this.store.pipe(
    select(UsersSelectors.getAllUsers)
  );
  //mutations$: Observable<Action> = this.getMutations();
  allTickets$: Observable<Ticket[]> = this.store.pipe(
    select(TicketsSelectors.getAllTickets)
  );
  allTicketVms$: Observable<TicketVm[]> = this.getAllTicketVms();
  selectedTicket$: Observable<Ticket> = this.store.pipe(
    select(TicketsSelectors.getSelected)
  );
  selectedTicketByRoute$: Observable<Ticket> = this.store.pipe(
    select(TicketsSelectors.getSelectedByRoute)
  );

  constructor(private store: Store<{}>) {}

  // getMutations(): Observable<Action> {
  //   return this.actions$.pipe(
  //     filter(
  //       (action: Action) => action.type === routerNavigatedAction.type //||
  //       //action.type === TicketsApiActions.createTicketSuccess.type ||
  //       //action.type === TicketsApiActions.updateTicketSuccess.type
  //     )
  //   );
  // }

  getAllTicketVms(): Observable<TicketVm[]> {
    return combineLatest([this.allTickets$, this.allUsers$]).pipe(
      map(([tickets, users]) =>
        tickets.map((ticket: TicketVm) => ({
          ...ticket,
          assignees: users.filter(user => user.id === ticket.assigneeId)
        }))
      )
    );
  }

  loadAll(): void {
    this.dispatch(TicketsActions.loadTickets());
  }

  selectTicketById(selectedId: string): void {
    this.dispatch(TicketsActions.selectTicketById({ selectedId }));
  }

  selectTicket(ticket: Ticket): void {
    this.dispatch(TicketsActions.selectTicket({ ticket }));
  }

  selectTicketByRoute(): void {
    this.dispatch(TicketsActions.selectTicketByRoute());
  }

  loadTickets(): void {
    this.dispatch(TicketsActions.loadTickets());
  }

  loadFilterTickets(queryStr: string): void {
    this.dispatch(TicketsActions.loadFilterTickets({ queryStr }));
  }

  loadFilterTicketsByRoute(): void {
    this.dispatch(TicketsActions.loadFilterTicketsByRoute());
  }

  loadUsers(): void {
    this.dispatch(UsersActions.loadUsers());
  }

  createTicket(ticket: Ticket): void {
    this.dispatch(TicketsActions.createTicket({ ticket }));
  }

  updateTicket(ticket: Ticket): void {
    this.dispatch(TicketsActions.updateTicket({ ticket }));
  }

  deleteTicket(ticket: Ticket): void {
    this.dispatch(TicketsActions.deleteTicket({ ticket }));
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
