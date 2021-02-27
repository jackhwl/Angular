import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@vi/shared/auth';

import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';
//import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    //LoginModule,
    AuthModule,
    // app
    AppRoutingModule,

    // core
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
