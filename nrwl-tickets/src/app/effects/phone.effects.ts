import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService } from "../services/backend.service";
import { PhoneActions, PhoneApiActions, TicketActions, TicketApiActions } from "../actions";
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Phone } from "../models/model";

@Injectable()
export class PhonesEffects {
  ticketService: any;
  constructor(private actions$: Actions, private phoneService: BackendService) {}

  loadPhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction, PhoneActions.loadPhones, TicketApiActions.addPhoneSuccess, PhoneApiActions.updatePhonesSuccess),
      fetch({
        run: action =>
          this.phoneService
            .phones()
            .pipe(
              //tap(t => console.log('PhoneActions.loadPhones=', t)),
              switchMap((phones: Phone[]) => [
                PhoneApiActions.loadPhonesSuccess({ phones })
              ])
            ),

        onError: (action, error) => {
          //console.error("Error", error);
          return PhoneApiActions.loadPhonesFailure({ error });
        }
      })
    )
  );

  updatePhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhoneActions.updatePhones),
      pessimisticUpdate({
        run: action =>
          this.phoneService.updatePhones(action.phones).pipe(
            switchMap(success => [
              success ? PhoneApiActions.updatePhonesSuccess({
                phones: action.phones
              }) : PhoneApiActions.updatePhonesFailure({ error: 'something wrong' })
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
