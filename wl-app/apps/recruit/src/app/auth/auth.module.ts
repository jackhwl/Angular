import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@wl/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { fromAuth } from '@wl/core-state';

@NgModule({
  //declarations: [LoginComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducers),
    AuthRoutingModule
  ]
})
export class AuthModule {}
