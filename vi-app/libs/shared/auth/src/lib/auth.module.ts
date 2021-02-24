import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedCommonModule } from '@vi/shared/common';
import { AuthRoutingModule } from './auth-routing.module';
import * as fromAuth from './reducers';
import { AuthEffects } from './effects/auth.effects';

import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent
];

@NgModule({
  imports: [
    SharedCommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: COMPONENTS,
  entryComponents: []
})
export class AuthModule {}
