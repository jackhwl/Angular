import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { combineLatest, filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BackendService } from "../services/backend.service";
import { PhonesActions, TicketsActions, TicketsApiActions } from "../actions";
import { selectCurrentRoute, selectQueryParam, selectRouteParams, selectUrl } from "../reducers/router.selectors";
import { routerNavigatedAction, SerializedRouterStateSnapshot } from "@ngrx/router-store";
import { Phone, Ticket } from "../models/model";
import { TicketService } from "../services/ticket.service";

@Injectable()
export class TicketsEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private ticketService: TicketService
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
              tap(t => console.log('aa=', t)),
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

  loadTicketByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction, TicketsActions.loadTicket),
      withLatestFrom(this.store.pipe(select(selectRouteParams))),
      filter(([, p]) => Object.keys(p).includes('id')),
      fetch({
        run: (action, p) => 
          this.ticketService.ticket(p['id'])
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

  loadFilterTicketsByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store.pipe(select(selectUrl))),
      filter(([, url]) => url.startsWith('/tickets') && !url.startsWith('/tickets/new')),
      fetch({
        run: action => {
          const qmaps = this.getAllQueryParameters(action.payload.routerState)
          return this.ticketService
            .filteredTickets(qmaps.get('q'))
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

  private getAllRouteParameters(snapshot: SerializedRouterStateSnapshot) {
    let route = snapshot.root;
    let params = new Map(Object.keys(route.params).map(key => [key, route.params[key]]));
    while (route.firstChild) {
      route = route.firstChild;
      Object.keys(route.params).forEach(key => params.set(key, route.params[key]));
    }
    return params;
  }
  
  private getAllQueryParameters(snapshot: SerializedRouterStateSnapshot) {
    let route = snapshot.root;
    let params = new Map(Object.keys(route.queryParams).map(key => [key, route.queryParams[key]]));
    while (route.firstChild) {
      route = route.firstChild;
      Object.keys(route.queryParams).forEach(key => params.set(key, route.queryParams[key]));
    }
    return params;
  }
  
  addPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.addPhone),
      pessimisticUpdate({
        run: action =>
          this.ticketService.addPhone().pipe(
            switchMap((phone: Phone) => [
              TicketsApiActions.addPhoneSuccess({ ticketId: action.ticketId, phone }),
            ])
          )
          ,
        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.addPhoneFailure({ error });
        }
      })
    )
  );

  deletePhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.deletePhone),
      pessimisticUpdate({
        run: action =>
          this.ticketService.deletePhone(action.id).pipe(
            switchMap((success: Boolean) => [
              success 
              ? TicketsApiActions.deletePhoneSuccess({ ticketId: action.ticketId, id: action.id })
              : TicketsApiActions.deletePhoneFailure({ error: 'something wrong' })
            ])
          )
          ,
        onError: (action, error) => {
          console.error("Error", error);
          return TicketsApiActions.deletePhoneFailure({ error });
        }
      })
    )
  );
}
