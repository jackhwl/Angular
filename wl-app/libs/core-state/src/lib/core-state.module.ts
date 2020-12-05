import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStudents from './students/students.reducer';
import { StudentsEffects } from './students/students.effects';
import { StudentsFacade } from './students/students.facade';

export const coreStateRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(
      fromStudents.STUDENTS_FEATURE_KEY,
      fromStudents.reducer
    ),
    EffectsModule.forFeature([StudentsEffects]),
  ],
  providers: [StudentsFacade],
})
export class CoreStateModule {}
