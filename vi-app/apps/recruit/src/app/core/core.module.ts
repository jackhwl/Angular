import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { SecurityAuthGuard, SecurityService } from '@wl/core-data';
import { SharedCommonModule } from '@vi/shared/common';
import { AuthFacade } from '@vi/shared/auth';

import { AppComponent } from './containers/app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { NotFoundPageComponent } from './components/not-found-page.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { ToolbarComponent } from './components/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { CoreFacade } from './services/core.facade';
import { environment } from '@vi/shared/environments';
import { entityConfig } from './entity-metadata';

export const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  SidenavListComponent,

  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,

  NotFoundPageComponent
];

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedCommonModule,

    StoreModule.forRoot({}), //reducers, { metaReducers }

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'NgRx Book Store App'
        }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([]),

    environment.ngrxData ? EntityDataModule.forRoot(entityConfig) : []
    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    //DBModule.provideDB(schema),
  ],
  declarations: COMPONENTS,
  providers: [AuthFacade, CoreFacade], //SecurityService, SecurityAuthGuard,
  exports: [SharedCommonModule, TranslateModule, ...COMPONENTS]
})
export class CoreModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
