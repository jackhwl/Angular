import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@wl/shared';
import { JobsFacade, JobsEffects, fromJobs } from '@wl/core-state';
import { JobsRoutingModule } from './jobs-routing.module';

import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobsComponent } from './containers/jobs.component';

@NgModule({
  declarations: [JobsListComponent, JobsComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromJobs.JOBS_FEATURE_KEY, fromJobs.jobsReducer),
    EffectsModule.forFeature([JobsEffects]),
    JobsRoutingModule
  ],
  providers: [JobsFacade]
})
export class JobsModule {}
