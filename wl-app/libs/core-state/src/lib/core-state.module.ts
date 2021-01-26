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

import * as fromStudents from './students/students.reducer';
import { StudentsEffects } from './students/students.effects';
import { PluralHttpUrlGenerator } from '@wl/core-data';
import * as fromJobs from './jobs/jobs.reducer';
import { JobsEffects } from './jobs/jobs.effects';
import { JobsFacade } from './jobs/jobs.facade';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature(
      fromStudents.STUDENTS_FEATURE_KEY,
      fromStudents.reducer
    ),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([StudentsEffects]),

    NgrxDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    StoreModule.forFeature(fromJobs.JOBS_FEATURE_KEY, fromJobs.jobReducer),
    EffectsModule.forFeature([JobsEffects])
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
