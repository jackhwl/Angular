import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { switchMap, tap, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AddressActions, TicketActions, TicketApiActions, TicketDetailsPageActions, TicketListPageActions, UserActions } from "../actions";
import { selectRouteParams } from "../reducers/router.selectors";
import { Ticket } from "../models/model";
import { TicketService } from "../services/ticket.service";
import { Router } from "@angular/router";

@Injectable()
export class TicketEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private ticketService: TicketService,
    private router: Router
  ) {}

  loadTicketByRoute$ = createEffect(() =>
    this.actions$.pipe(
      //ofType(routerNavigatedAction, TicketActions.loadTicket),
      ofType(TicketDetailsPageActions.opened),
      withLatestFrom(this.store.pipe(select(selectRouteParams))),
      //filter(([, p]) => Object.keys(p).includes('id')),
      fetch({
        run: (action, p) => 
          this.ticketService.ticket(p['id'])
          .pipe(
            switchMap((ticket: Ticket) => [
              TicketApiActions.loadTicketSuccess({ ticket }),
              UserActions.loadUsers(),
              AddressActions.loadAddressesOfTicket({ ticketId: ticket.id})
            ])
          ),
      onError: (action, error) => 
         TicketApiActions.loadTicketFailure({ error })
      })
    )
  );

  loadFilterTicketsByRoute$ = createEffect(() =>
    this.actions$.pipe(
      //ofType(routerNavigatedAction),
      //withLatestFrom(this.store.pipe(select(selectUrl))),
      //filter(([, url]) => url.startsWith(`/${TICKETMODULE_ROUTE_KEY}`) && !url.startsWith(`/${TICKETMODULE_ROUTE_KEY}/`)),
      ofType(TicketListPageActions.opened, TicketListPageActions.filterParamChanged),
      //withLatestFrom(this.store.pipe(select(selectQueryParams))),
      fetch({
        run: (action) => {
          //console.log(action)
          //const qmaps = this.getAllQueryParameters(action.payload.routerState)
          return this.ticketService
            .filteredTickets('q' in action ? action.q : '')
            .pipe(
              tap(() => 'q' in action
                    ? this.router.navigate(["./"], {
                        queryParams: { q: action.q },
                        queryParamsHandling: "merge"
                      })
                    : ''
              ),
              tap(() => console.log('TicketListPageActions.filterParamChanged effect')),
              switchMap((tickets: Ticket[]) => [
                TicketApiActions.loadFilterTicketsSuccess({ tickets }),
                UserActions.loadUsers()
              ]),
            );
        },

        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.loadFilterTicketsFailure({ error });
        }
      })
    )
  );

  upsertTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.upsertTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService.upsert(action.ticket).pipe(
            switchMap(ticket => [
              TicketApiActions.upsertTicketSuccess({
                ticket
              })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.upsertTicketFailure({ error });
        }
      })
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.deleteTicket),
      pessimisticUpdate({
        run: action =>
          this.ticketService.delete(action.id).pipe(
            switchMap(id => [
              TicketApiActions.deleteTicketSuccess({ id })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.deleteTicketFailure({ error });
        }
      })
    )
  );

  // loadTickets$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.loadTickets),
  //     fetch({
  //       run: action =>
  //         this.ticketService
  //           .tickets()
  //           .pipe(
  //             mergeMap((tickets: Ticket[]) => [
  //               TicketApiActions.loadTicketsSuccess({ tickets })
  //             ])
  //           ),

  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         return TicketApiActions.loadTicketsFailure({ error });
  //       }
  //     })
  //   )
  // );

  // loadFilterTickets$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.loadFilterTickets),
  //     fetch({
  //       run: action =>
  //         this.ticketService
  //           .filteredTickets(action.queryStr)
  //           .pipe(
  //             tap(t => console.log('aa=', t)),
  //             switchMap((tickets: Ticket[]) => [
  //               TicketApiActions.loadFilterTicketsSuccess({ tickets })
  //             ])
  //           ),

  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         return TicketApiActions.loadFilterTicketsFailure({ error });
  //       }
  //     })
  //   )
  // );

  // loadTicket$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.loadTicket),
  //     fetch({
  //       run: action =>
  //         this.ticketService
  //           .ticket(action.ticket.id)
  //           .pipe(
  //             switchMap((ticket: Ticket) => [
  //               TicketApiActions.loadTicketSuccess({ ticket })
  //             ])
  //           ),
  //       onError: (action, error) =>
  //         TicketApiActions.loadTicketFailure({ error })
  //     })
  //   )
  // );

  // loadTicketWithNewAddresses$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketApiActions.addNewAddressesSuccess),
  //     fetch({
  //       run: action =>
  //         this.ticketService
  //           .ticket(action.id)
  //           .pipe(
  //             switchMap((ticket: Ticket) => [
  //               TicketApiActions.loadTicketSuccess({ ticket })
  //             ])
  //           ),
  //       onError: (action, error) =>
  //         TicketApiActions.loadTicketFailure({ error })
  //     })
  //   )
  // );

  // createTicket$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.createTicket),
  //     pessimisticUpdate({
  //       run: action =>
  //         this.ticketService
  //           .newTicket(action.ticket)
  //           .pipe(
  //             switchMap((ticket: Ticket) => [
  //               TicketApiActions.createTicketSuccess({ ticket })
  //             ])
  //           ),
  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         TicketApiActions.createTicketFailure({ error });
  //       }
  //     })
  //   )
  // );

  // updateTicket$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.updateTicket),
  //     pessimisticUpdate({
  //       run: action =>
  //         this.ticketService.update(action.ticket.id, action.ticket).pipe(
  //           switchMap(ticket => [
  //             TicketApiActions.updateTicketSuccess({
  //               ticket
  //             })
  //           ])
  //         ),
  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         return TicketApiActions.updateTicketFailure({ error });
  //       }
  //     })
  //   )
  // );



  // private getAllRouteParameters(snapshot: SerializedRouterStateSnapshot) {
  //   let route = snapshot.root;
  //   let params = new Map(Object.keys(route.params).map(key => [key, route.params[key]]));
  //   while (route.firstChild) {
  //     route = route.firstChild;
  //     Object.keys(route.params).forEach(key => params.set(key, route.params[key]));
  //   }
  //   return params;
  // }
  
  // private getAllQueryParameters(snapshot: SerializedRouterStateSnapshot) {
  //   let route = snapshot.root;
  //   let params = new Map(Object.keys(route.queryParams).map(key => [key, route.queryParams[key]]));
  //   while (route.firstChild) {
  //     route = route.firstChild;
  //     Object.keys(route.queryParams).forEach(key => params.set(key, route.queryParams[key]));
  //   }
  //   return params;
  // }
  
  // addPhone$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.addPhone),
  //     pessimisticUpdate({
  //       run: action =>
  //         this.ticketService.addPhone().pipe(
  //           switchMap((phone: Phone) => [
  //             TicketApiActions.addPhoneSuccess({ ticketId: action.ticketId, phone }),
  //           ])
  //         )
  //         ,
  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         return TicketApiActions.addPhoneFailure({ error });
  //       }
  //     })
  //   )
  // );

  // deletePhone$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(TicketActions.deletePhone),
  //     pessimisticUpdate({
  //       run: action =>
  //         this.ticketService.deletePhone(action.id).pipe(
  //           switchMap((success: Boolean) => [
  //             success 
  //             ? TicketApiActions.deletePhoneSuccess({ ticketId: action.ticketId, id: action.id })
  //             : TicketApiActions.deletePhoneFailure({ error: 'something wrong' })
  //           ])
  //         )
  //         ,
  //       onError: (action, error) => {
  //         console.error("Error", error);
  //         return TicketApiActions.deletePhoneFailure({ error });
  //       }
  //     })
  //   )
  // );
}
