import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { PhoneActions, PhoneApiActions } from "../actions";
import { switchMap } from "rxjs/operators";
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
              switchMap((phones: Phone[]) => [
                PhoneApiActions.loadPhonesOfAddressSuccess({ phones })
              ])
            ),

        onError: (action, error) => 
          PhoneApiActions.loadPhonesOfAddressFailure({ error })
      })
    )
  );

  updatePhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhoneActions.updatePhones),
      pessimisticUpdate({
        run: action =>
          this.service.updatePhones(action.aIdPhones).pipe(
            switchMap(phones => 
                 [
                  PhoneApiActions.updatePhonesSuccess({ phones })
                ]
            )
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
            switchMap(ids => 
                [ PhoneApiActions.deleteAddressesPhonesSuccess({ ids }) ]
            )
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
