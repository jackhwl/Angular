import { NgModule } from '@angular/core';

import { SharedCommonModule } from '@vi/shared/common';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';

export const COMPONENTS = [StudentsListComponent, StudentDetailsComponent];

@NgModule({
  imports: [SharedCommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class StudentsComponentsModule {}
