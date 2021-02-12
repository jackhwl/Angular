import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@wl/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects, fromAuth } from '@wl/core-state';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {
  LogoutConfirmationDialogComponent,
  LogoutDialogModule
} from '@wl/logout-dialog';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent
  //LogoutConfirmationDialogComponent
];

@NgModule({
  imports: [
    SharedModule,
    LogoutDialogModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent]
})
export class AuthModule {}
