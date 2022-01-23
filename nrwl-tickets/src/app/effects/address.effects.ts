import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { select, Store } from "@ngrx/store";
import { filter, switchMap, withLatestFrom } from "rxjs/operators";
import { AddressActions, AddressApiActions } from "../actions";
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
      ofType(routerNavigatedAction, AddressActions.loadAddressesOfTicket),
      withLatestFrom(this.store.pipe(select(selectRouteParams))),
      filter(([, p]) => Object.keys(p).includes('id')),
      fetch({
        run: (action, p) => 
          this.service.addressOfTicket(p['id'])
          .pipe(
            switchMap((addresses: Address[]) => [
              AddressApiActions.loadAddressesOfTicketSuccess({ addresses })
            ])
          ),
      onError: (action, error) => 
        AddressApiActions.loadAddressesOfTicketFailure({ error })
      })
    )
  );

}