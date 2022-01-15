import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BackendService } from "../services/backend.service";
import { TicketsActions, TicketsApiActions } from "../actions";
import { selectQueryParam } from "../reducers/router.selectors";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Ticket } from "../models/model";

@Injectable()
export class TicketsEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private ticketService: BackendService
  ) {}

  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTickets),
      fetch({
        run: action =>
          this.ticketService
            .tickets()
            .pipe(
              mergeMap((tickets: Ticket[]) => [
                TicketsApiActions.loadTicketsSuccess({ tickets })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.loadTicketsFailure({ error });
        }
      })
    )
  );

  loadFilterTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadFilterTickets),
      fetch({
        run: action =>
          this.ticketService
            .filteredTickets(action.queryStr)
            .pipe(
              switchMap((tickets: Ticket[]) => [
                TicketsApiActions.loadFilterTicketsSuccess({ tickets })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.loadFilterTicketsFailure({ error });
        }
      })
    )
  );

  loadFilterTicketsByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store.pipe(select(selectQueryParam("q")))),
      fetch({
        run: (action, q) => {
          return this.ticketService
            .filteredTickets(q)
            .pipe(
              switchMap((tickets: Ticket[]) => [
                TicketsApiActions.loadFilterTicketsSuccess({ tickets })
              ])
            );
        },

        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.loadFilterTicketsFailure({ error });
        }
      })
    )
  );

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTicket),
      fetch({
        run: action =>
          this.ticketService
            .ticket(action.ticket.id)
            .pipe(
              switchMap((ticket: Ticket) => [
                TicketsApiActions.loadTicketSuccess({ ticket })
              ])
            ),
        onError: (action, error) =>
          TicketsApiActions.loadTicketFailure({ error })
      })
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.createTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService
            .newTicket(action.ticket)
            .pipe(
              switchMap((ticket: Ticket) => [
                TicketsApiActions.createTicketSuccess({ ticket })
              ])
            ),
        onError: (action, error) => {
          console.error("Error", error);
          TicketsApiActions.createTicketFailure({ error });
        }
      })
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.updateTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService.update(action.ticket.id, action.ticket).pipe(
            switchMap(_ => [
              TicketsApiActions.updateTicketSuccess({
                ticket: action.ticket
              })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.updateTicketFailure({ error });
        }
      })
    )
  );

  addPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.addPhone),
      pessimisticUpdate({
        run: action =>
          this.ticketService.addPhone(action.ticket).pipe(
            switchMap((ticket: Ticket) => [
              TicketsApiActions.addPhoneSuccess({ ticket })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.addPhoneFailure({ error });
        }
      })
    )
  );
}
