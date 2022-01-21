import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService } from "../services/backend.service";
import { PhonesActions, PhonesApiActions, TicketsActions, TicketsApiActions } from "../actions";
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
      ofType(routerNavigatedAction, PhonesActions.loadPhones, TicketsApiActions.addPhoneSuccess, PhonesApiActions.updatePhonesSuccess),
      fetch({
        run: action =>
          this.phoneService
            .phones()
            .pipe(
              //tap(t => console.log('PhonesActions.loadPhones=', t)),
              switchMap((phones: Phone[]) => [
                PhonesApiActions.loadPhonesSuccess({ phones })
              ])
            ),

        onError: (action, error) => {
          //console.error("Error", error);
          return PhonesApiActions.loadPhonesFailure({ error });
        }
      })
    )
  );

  updatePhones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhonesActions.updatePhones),
      pessimisticUpdate({
        run: action =>
          this.phoneService.updatePhones(action.phones).pipe(
            switchMap(success => [
              success ? PhonesApiActions.updatePhonesSuccess({
                phones: action.phones
              }) : PhonesApiActions.updatePhonesFailure({ error: 'something wrong' })
            ])
          ),
        onError: (action, error) => {
          console.error("Error", error);
          return PhonesApiActions.updatePhonesFailure({ error });
        }
      })
    )
  );
//   loadPhone$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(PhonesActions.loadPhone),
//       fetch({
//         run: action =>
//           this.phoneService.phone(action.phone.id).pipe(
//             tap(t => console.log("t=", t)),
//             switchMap((phone: Phone) => [
//               PhonesApiActions.loadPhoneSuccess({ phone })
//             ])
//           ),
//         onError: (action, error) => PhonesApiActions.loadPhoneFailure({ error })
//       })
//     )
//   );
}
