import { NgModule } from '@angular/core';
import { StudentsComponent } from './students/students.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFacade } from '@wl/core-state';
import { SharedModule } from '@wl/shared';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsComponent }
];

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentsListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [StudentsFacade]
})
export class StudentsModule {}
