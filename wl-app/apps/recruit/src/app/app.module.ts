import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreDataModule } from '@wl/core-data';
import { CoreStateModule } from '@wl/core-state';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavListComponent],
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreDataModule,
    CoreStateModule,
    CoreModule,

    // app
    RoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
