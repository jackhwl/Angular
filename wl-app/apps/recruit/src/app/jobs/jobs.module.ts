import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SloganComponent } from './slogan/slogan.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: JobsListComponent }
];

@NgModule({
  declarations: [JobsListComponent, SloganComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class JobsModule {}
