import { NgModule } from '@angular/core';
import { StudentsComponent } from './students/students.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFacade } from '@wl/core-state';
import { SharedCommonModule } from '@vi/shared/common';
import { StoreModule } from '@ngrx/store';
import * as fromStudents from 'libs/core-state/src/lib/students/students.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from 'libs/core-state/src/lib/students/students.effects';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsComponent }
];

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentsListComponent
  ],
  imports: [
    SharedCommonModule,
    StoreModule.forFeature(
      fromStudents.STUDENTS_FEATURE_KEY,
      fromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentsEffects]),
    RouterModule.forChild(routes)
  ],
  providers: [StudentsFacade]
})
export class StudentsModule {}
