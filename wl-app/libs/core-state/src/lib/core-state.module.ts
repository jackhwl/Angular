import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { NgrxDataModule } from 'ngrx-data';
import { entityConfig } from './entity-metadata';

import * as fromStudents from './students/students.reducer';
import { StudentsEffects } from './students/students.effects';

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
  ]
})
export class CoreStateModule {}
