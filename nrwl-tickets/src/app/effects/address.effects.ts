import { Injectable } from "@angular/core";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { select, Store } from "@ngrx/store";
import { filter, switchMap, withLatestFrom } from "rxjs/operators";
import { AddressActions, AddressApiActions, PhoneActions, TicketApiActions } from "../actions";
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
              AddressApiActions.loadAddressesOfTicketSuccess({ addresses }),
              PhoneActions.loadPhonesOfAddress({ addressIds: addresses.map(a => a.id) }),
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
          this.service.updateAddresses(action.ticketId, action.addresses).pipe(
            switchMap(addresses => {
              //const [first] = action.addresses;
              // const newAddressesTicketIds = action.addresses.filter(p => p.id === null).map(p => p.ticketId)
              // if (newAddressesTicketIds.length>0) {
                return [
                  AddressApiActions.updateAddressesSuccess({ addresses }),
                  TicketApiActions.updateAddressesSuccess({ 
                    ticket: {
                        id: action.ticketId, 
                        changes: {
                          addressIds: addresses.map(p => p.id) 
                        }
                      }
                  })
                ]
              // } else {
                // return [
                //   AddressApiActions.updateAddressesSuccess({ addresses })
                // ]
              //}
            })
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return AddressApiActions.updateAddressesFailure({ error });
        }
      })
    )
  );

  deleteTicketAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.deleteTicketAddresses),
      pessimisticUpdate({
        run: action =>
          this.service.deleteTicketAddresses(action.ticketId).pipe(
            switchMap(ids => {
                return [
                  AddressApiActions.deleteTicketAddressesSuccess({ ids }),
                ]
            })
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return AddressApiActions.deleteTicketAddressesFailure({ error });
        }
      })
    )
  );
}