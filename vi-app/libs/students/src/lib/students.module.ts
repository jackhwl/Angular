import { NgModule } from '@angular/core';
import { StudentsComponent } from './containers/students.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentsFacade, StudentsStoreFacade } from './services';
import { SharedCommonModule } from '@vi/shared/common';
import { StoreModule } from '@ngrx/store';
import * as fromStudents from './reducers/students.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './effects/students.effects';
import { StudentsComponentsModule } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsComponent }
];

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    StudentsComponentsModule,
    SharedCommonModule,
    StoreModule.forFeature(
      fromStudents.STUDENTS_FEATURE_KEY,
      fromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentsEffects]),
    RouterModule.forChild(routes)
  ],
  providers: [StudentsFacade, StudentsStoreFacade]
})
export class StudentsModule {}
