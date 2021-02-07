import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthApiActions } from './actions';
import * as fromAuth from './reducers';

// import { AuthApiActions } from '@wl/core-state';
// import { AuthFacade } from '@wl/core-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{}>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(AuthApiActions.loginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
