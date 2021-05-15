import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisesRoutingModule } from './crises-routing.module';

@NgModule({
  declarations: [CrisisListComponent, CrisisDetailComponent],
  imports: [CommonModule, FormsModule, CrisesRoutingModule]
})
export class CrisesModule {}
