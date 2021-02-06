import { NgModule } from '@angular/core';

import { SharedModule } from '@wl/shared';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsFacade } from '@wl/core-state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromJobs from 'libs/core-state/src/lib/jobs/jobs.reducer';
import { JobsEffects } from 'libs/core-state/src/lib/jobs/jobs.effects';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  declarations: [JobsListComponent, JobsComponent],
  imports: [
    SharedModule,
    JobsRoutingModule,
    StoreModule.forFeature(fromJobs.JOBS_FEATURE_KEY, fromJobs.jobsReducer),
    EffectsModule.forFeature([JobsEffects])
  ],
  providers: [JobsFacade]
})
export class JobsModule {}
