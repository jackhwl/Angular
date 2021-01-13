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

import * as fromStudents from './students/students.reducer';
import { StudentsEffects } from './students/students.effects';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiEndpoint
};

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
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: environment.ngrxData
    ? [
        {
          provide: DefaultDataServiceConfig,
          useValue: defaultDataServiceConfig
        },
        { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
      ]
    : []
})
export class CoreStateModule {}
