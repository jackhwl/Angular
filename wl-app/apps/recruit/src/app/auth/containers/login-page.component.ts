import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import { LoginPageActions } from '@wl/core-state';
import { Credentials } from '@wl/api-interfaces';

@Component({
  selector: 'wl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: []
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
