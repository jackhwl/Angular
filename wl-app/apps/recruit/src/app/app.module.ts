import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreStateModule } from '@wl/core-state';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    LoginModule,
    AuthModule,
    // app
    AppRoutingModule,

    // core
    CoreStateModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
