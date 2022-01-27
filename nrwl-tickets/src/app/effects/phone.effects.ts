import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService } from "../services/backend.service";
import { PhoneActions, PhoneApiActions, TicketActions, TicketApiActions } from "../actions";
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
          this.service.updatePhones(action.phones).pipe(
            switchMap(phones => [
              PhoneApiActions.updatePhonesSuccess({
                phones: phones.map(p => ({id: p.id, changes: {...p}}))
              })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return PhoneApiActions.updatePhonesFailure({ error });
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
