import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService, Ticket } from "../services/backend.service";
import { TicketsActions, TicketsApiActions } from "../actions";
import { switchMap, tap } from "rxjs/operators";

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTickets),
      fetch({
        run: action =>
          this.ticketService
            .tickets()
            .pipe(
              switchMap((tickets: Ticket[]) => [
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

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTicket),
      fetch({
        run: action =>
          this.ticketService.ticket(action.ticket.id).pipe(
            tap(t => console.log("t=", t)),
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

  constructor(
    private actions$: Actions,
    private ticketService: BackendService
  ) {}
}
