import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { combineLatest, filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { BackendService } from "../services/backend.service";
import { AddressActions, PhoneActions, TicketActions, TicketApiActions, TicketDetailsPageActions } from "../actions";
import { selectCurrentRoute, selectQueryParam, selectRouteParams, selectUrl } from "../reducers/router.selectors";
import { routerNavigatedAction, SerializedRouterStateSnapshot } from "@ngrx/router-store";
import { Phone, Ticket } from "../models/model";
import { TicketService } from "../services/ticket.service";
import { AddressService } from "../services/address.service";
import { of } from "rxjs";

@Injectable()
export class TicketVmEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private ticketService: TicketService,
    private addressService: AddressService
  ) {}

  updateTicketVm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketDetailsPageActions.updateTicketVm),
      pessimisticUpdate({
        run: action => {
            const ticket = this.ticketService.getTicketFromVm(action.ticketVm)
            const addresses = action.ticketVm.addresses.map(a_vm => this.addressService.getAddressFromVm(a_vm))
            const aIdPhones = action.ticketVm.addresses.map(a => ({addressId: a.id, phones: a.phones}))
            return of(action).pipe(
              tap(() => console.log(addresses)),
                switchMap (_ => [
                  TicketActions.upsertTicket({ ticket }),
                  PhoneActions.updatePhones({ aIdPhones }),
                  AddressActions.updateAddresses({ ticketId: action.ticketVm.id, addresses }),
                ])
        )},
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.updateTicketFailure({ error });
        }
      })
    )
  );

}