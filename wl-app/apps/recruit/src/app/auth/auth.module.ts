import { NgModule } from '@angular/core';
import { SharedModule } from '@wl/shared';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  //declarations: [LoginComponent],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule {}
