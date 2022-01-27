import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { select, Store } from "@ngrx/store";
import { filter, switchMap, withLatestFrom } from "rxjs/operators";
import { AddressActions, AddressApiActions, PhoneActions } from "../actions";
import { Address } from "../models/model";
import { selectRouteParams } from "../reducers/router.selectors";
import { AddressService } from "../services/address.service";

@Injectable()
export class AddressEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private service: AddressService
  ) {}

  loadAddressByRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.loadAddressesOfTicket),
      //withLatestFrom(this.store.pipe(select(selectRouteParams))),
      //filter(([, p]) => Object.keys(p).includes('id')),
      fetch({
        run: (action) => 
          this.service.addressOfTicket(action.ticketId)
          .pipe(
            switchMap((addresses: Address[]) => [
              PhoneActions.loadPhonesOfAddress({ addressIds: addresses.map(a => a.id) }),
              AddressApiActions.loadAddressesOfTicketSuccess({ addresses })
            ])
          ),
      onError: (action, error) => 
        AddressApiActions.loadAddressesOfTicketFailure({ error })
      })
    )
  );

  updateAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.updateAddresses),
      pessimisticUpdate({
        run: action =>
          this.service.updateAddresses(action.addresses).pipe(
            switchMap(success => [
              success ? AddressApiActions.updateAddressesSuccess({
                addresses: action.addresses.map(a => ({id: a.id, changes: {...a}}))
              }) : AddressApiActions.updateAddressesFailure({ error: 'something wrong' })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return AddressApiActions.updateAddressesFailure({ error });
        }
      })
    )
  );
}