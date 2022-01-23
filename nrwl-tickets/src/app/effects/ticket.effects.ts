import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { combineLatest, filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BackendService } from "../services/backend.service";
import { PhoneActions, TicketActions, TicketApiActions } from "../actions";
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
      ofType(TicketActions.loadTickets),
      fetch({
        run: action =>
          this.ticketService
            .tickets()
            .pipe(
              mergeMap((tickets: Ticket[]) => [
                TicketApiActions.loadTicketsSuccess({ tickets })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.loadTicketsFailure({ error });
        }
      })
    )
  );

  loadFilterTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadFilterTickets),
      fetch({
        run: action =>
          this.ticketService
            .filteredTickets(action.queryStr)
            .pipe(
              tap(t => console.log('aa=', t)),
              switchMap((tickets: Ticket[]) => [
                TicketApiActions.loadFilterTicketsSuccess({ tickets })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.loadFilterTicketsFailure({ error });
        }
      })
    )
  );

  loadTicketByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction, TicketActions.loadTicket),
      withLatestFrom(this.store.pipe(select(selectRouteParams))),
      filter(([, p]) => Object.keys(p).includes('id')),
      fetch({
        run: (action, p) => 
          this.ticketService.ticket(p['id'])
          .pipe(
            switchMap((ticket: Ticket) => [
              TicketApiActions.loadTicketSuccess({ ticket })
            ])
          ),
      onError: (action, error) => 
         TicketApiActions.loadTicketFailure({ error })
      })
    )
  );

  loadFilterTicketsByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store.pipe(select(selectUrl))),
      filter(([, url]) => url.startsWith('/tickets') && !url.startsWith('/tickets/')),
      fetch({
        run: action => {
          const qmaps = this.getAllQueryParameters(action.payload.routerState)
          return this.ticketService
            .filteredTickets(qmaps.get('q'))
            .pipe(
              switchMap((tickets: Ticket[]) => [
                TicketApiActions.loadFilterTicketsSuccess({ tickets })
              ])
            );
        },

        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.loadFilterTicketsFailure({ error });
        }
      })
    )
  );

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadTicket),
      fetch({
        run: action =>
          this.ticketService
            .ticket(action.ticket.id)
            .pipe(
              switchMap((ticket: Ticket) => [
                TicketApiActions.loadTicketSuccess({ ticket })
              ])
            ),
        onError: (action, error) =>
          TicketApiActions.loadTicketFailure({ error })
      })
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.createTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService
            .newTicket(action.ticket)
            .pipe(
              switchMap((ticket: Ticket) => [
                TicketApiActions.createTicketSuccess({ ticket })
              ])
            ),
        onError: (action, error) => {
          console.error("Error", error);
          TicketApiActions.createTicketFailure({ error });
        }
      })
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.updateTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService.update(action.ticket.id, action.ticket).pipe(
            switchMap(_ => [
              TicketApiActions.updateTicketSuccess({
                ticket: action.ticket
              })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.updateTicketFailure({ error });
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
      ofType(TicketActions.addPhone),
      pessimisticUpdate({
        run: action =>
          this.ticketService.addPhone().pipe(
            switchMap((phone: Phone) => [
              TicketApiActions.addPhoneSuccess({ ticketId: action.ticketId, phone }),
            ])
          )
          ,
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.addPhoneFailure({ error });
        }
      })
    )
  );

  deletePhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.deletePhone),
      pessimisticUpdate({
        run: action =>
          this.ticketService.deletePhone(action.id).pipe(
            switchMap((success: Boolean) => [
              success 
              ? TicketApiActions.deletePhoneSuccess({ ticketId: action.ticketId, id: action.id })
              : TicketApiActions.deletePhoneFailure({ error: 'something wrong' })
            ])
          )
          ,
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.deletePhoneFailure({ error });
        }
      })
    )
  );
}
