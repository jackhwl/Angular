import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsFacade } from '@wl/core-state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromJobs from 'libs/core-state/src/lib/jobs/jobs.reducer';
import { JobsEffects } from 'libs/core-state/src/lib/jobs/jobs.effects';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: JobsComponent }
];

@NgModule({
  declarations: [JobsListComponent, JobsComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromJobs.JOBS_FEATURE_KEY, fromJobs.jobsReducer),
    EffectsModule.forFeature([JobsEffects]),
    RouterModule.forChild(routes)
  ],
  providers: [JobsFacade]
})
export class JobsModule {}
