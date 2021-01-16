import { NgModule } from '@angular/core';

import { SharedModule } from '@wl/shared';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SecurityService } from '@wl/core-data';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule],
  providers: [SecurityService]
})
export class LoginModule {}
