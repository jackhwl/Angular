import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch, pessimisticUpdate } from "@nrwl/angular";
import { BackendService, User } from "../services/backend.service";
import { UsersActions, UsersApiActions } from "../actions";
import { switchMap, tap } from "rxjs/operators";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: BackendService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      fetch({
        run: action =>
          this.userService
            .users()
            .pipe(
              switchMap((users: User[]) => [
                UsersApiActions.loadUsersSuccess({ users })
              ])
            ),

        onError: (action, error) => {
          console.error("Error", error);
          return UsersApiActions.loadUsersFailure({ error });
        }
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUser),
      fetch({
        run: action =>
          this.userService.user(action.user.id).pipe(
            tap(t => console.log("t=", t)),
            switchMap((user: User) => [
              UsersApiActions.loadUserSuccess({ user })
            ])
          ),
        onError: (action, error) => UsersApiActions.loadUserFailure({ error })
      })
    )
  );
}
