import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import {
  DefaultDataServiceConfig,
  HttpUrlGenerator,
  NgrxDataModule
} from 'ngrx-data';
import { entityConfig } from './entity-metadata';

import { PluralHttpUrlGenerator } from '@wl/core-data';
import { metaReducers, reducers } from './reducers';
import { DBModule } from '@ngrx/db';
import { schema } from './db';

@NgModule({
  imports: [
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */

    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot(),
    NgrxDataModule.forRoot(entityConfig),
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
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    DBModule.provideDB(schema)
  ],
  providers:
    environment.ngrxData && !environment.inMemorryData
      ? [
          {
            provide: DefaultDataServiceConfig,
            useValue: { root: environment.apiEndpoint }
          },
          { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
        ]
      : []
})
export class CoreStateModule {}
