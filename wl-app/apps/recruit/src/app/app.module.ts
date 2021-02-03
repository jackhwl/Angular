import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreStateModule } from '@wl/core-state';
import { RoutingModule } from './routing.module';

import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core
    CoreStateModule,
    CoreModule,

    // app
    RoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
