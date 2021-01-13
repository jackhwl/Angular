import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreDataModule, PluralHttpUrlGenerator } from '@wl/core-data';
import { CoreStateModule } from '@wl/core-state';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';
import { environment } from '@env/environment';
import { CoreModule } from './core/core.module';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiEndpoint
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavListComponent],
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    //AppStoreModule,

    CoreDataModule,
    CoreStateModule,
    CoreModule,

    // app
    RoutingModule
  ],
  providers: environment.ngrxData
    ? [
        {
          provide: DefaultDataServiceConfig,
          useValue: defaultDataServiceConfig
        },
        { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
      ]
    : [],
  bootstrap: [AppComponent]
})
export class AppModule {}
