import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService } from "../services/backend.service";
import { UserActions, UserApiActions } from "../actions";
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store";
import { User } from "../models/model";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: BackendService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      fetch({
        run: action =>
          this.userService
            .users()
            .pipe(
              switchMap((users: User[]) => [
                UserApiActions.loadUsersSuccess({ users })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return UserApiActions.loadUsersFailure({ error });
        }
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      fetch({
        run: action =>
          this.userService.user(action.user.id).pipe(
            tap(t => console.log("t=", t)),
            switchMap((user: User) => [
              UserApiActions.loadUserSuccess({ user })
            ])
          ),
        onError: (action, error) => UserApiActions.loadUserFailure({ error })
      })
    )
  );
}
