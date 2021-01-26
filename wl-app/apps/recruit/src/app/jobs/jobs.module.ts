import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SloganComponent } from './slogan/slogan.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: JobsListComponent }
];

@NgModule({
  declarations: [JobsListComponent, SloganComponent, JobsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class JobsModule {}
