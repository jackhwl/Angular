import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Credentials } from '@vi/api-interfaces';
import * as fromAuth from '../reducers';
import { LoginPageActions } from '../actions';

@Component({
  selector: 'vi-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: []
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
