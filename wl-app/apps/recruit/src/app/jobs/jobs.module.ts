import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SloganComponent } from './slogan/slogan.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsFacade } from '@wl/core-state';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: JobsComponent }
];

@NgModule({
  declarations: [JobsListComponent, SloganComponent, JobsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [JobsFacade]
})
export class JobsModule {}
