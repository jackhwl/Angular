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
import * as fromJobs from './jobs/jobs.reducer';
import { JobsEffects } from './jobs/jobs.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({}),

    StoreModule.forFeature(fromJobs.JOBS_FEATURE_KEY, fromJobs.jobsReducer),

    EffectsModule.forRoot(),
    EffectsModule.forFeature([JobsEffects]),

    NgrxDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
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
