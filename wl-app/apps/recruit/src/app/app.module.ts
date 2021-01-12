import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule, PluralHttpUrlGenerator } from '@wl/core-data';
import { AppStoreModule, CoreStateModule } from '@wl/core-state';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SloganComponent } from './slogan/slogan.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NewsletterparentComponent } from './newsletterparent/newsletterparent.component';

import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';
import { environment } from '@env/environment';
import { CoreModule } from './core/core.module';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiEndpoint
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SloganComponent,
    NewsletterComponent,
    NewsletterparentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppStoreModule,

    CoreDataModule,
    CoreStateModule,
    CoreModule,
    RoutingModule
  ],
  providers: environment.inMemorryData
    ? []
    : [
        {
          provide: DefaultDataServiceConfig,
          useValue: defaultDataServiceConfig
        },
        { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
      ],
  bootstrap: [AppComponent]
})
export class AppModule {}
