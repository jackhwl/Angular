import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService } from "../services/backend.service";
import { AddressApiActions, PhoneActions, PhoneApiActions, TicketActions, TicketApiActions } from "../actions";
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Phone } from "../models/model";
import { PhoneService } from "../services/phone.service";

@Injectable()
export class PhonesEffects {
  ticketService: any;
  constructor(private actions$: Actions, private service: PhoneService) {}

  loadPhonesOfAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhoneActions.loadPhonesOfAddress),
      fetch({
        run: action =>
          this.service
            .phones(action.addressIds)
            .pipe(
              //tap(t => console.log('PhoneActions.loadPhones=', t)),
              switchMap((phones: Phone[]) => [
                PhoneApiActions.loadPhonesOfAddressSuccess({ phones })
              ])
            ),

        onError: (action, error) => {
          //console.error("Error", error);
          return PhoneApiActions.loadPhonesOfAddressFailure({ error });
        }
      })
    )
  );

  updatePhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhoneActions.updatePhones),
      pessimisticUpdate({
        run: action =>
          this.service.updatePhones(action.aIdPhones).pipe(
            switchMap(phones => {
              // const newPhoneAddressIds = action.aIdPhones.filter(p => p.id === null).map(p => p.addressId)
              // if (newPhoneAddressIds.length>0) {
              //   return [
              //     PhoneApiActions.updatePhonesSuccess({ phones }),
              //     AddressApiActions.addNewPhonesSuccess(
              //       { addresses: newPhoneAddressIds.map(addressId => 
              //         ({ id: addressId, 
              //           changes: {
              //             phoneIds: phones.filter(p => p.addressId === addressId).map(p => p.id) 
              //           }
              //         })
              //       )}
              //     )
              //   ]
              // } else {
                return [
                  PhoneApiActions.updatePhonesSuccess({ phones })
                ]
              //}
          })
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return PhoneApiActions.updatePhonesFailure({ error });
        }
      })
    )
  );

  deleteAddressesPhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhoneActions.deleteAddressesPhones),
      pessimisticUpdate({
        run: action =>
          this.service.deleteAddressesPhones(action.addressIds).pipe(
            switchMap(ids => {
                return [
                  PhoneApiActions.deleteAddressesPhonesSuccess({ ids })
                ]
            })
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return PhoneApiActions.deleteAddressesPhonesFailure({ error });
        }
      })
    )
  );

//   loadPhone$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(PhoneActions.loadPhone),
//       fetch({
//         run: action =>
//           this.phoneService.phone(action.phone.id).pipe(
//             tap(t => console.log("t=", t)),
//             switchMap((phone: Phone) => [
//               PhoneApiActions.loadPhoneSuccess({ phone })
//             ])
//           ),
//         onError: (action, error) => PhoneApiActions.loadPhoneFailure({ error })
//       })
//     )
//   );
}
