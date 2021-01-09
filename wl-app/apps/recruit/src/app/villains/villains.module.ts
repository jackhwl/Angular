import { NgModule } from '@angular/core';
import { VillainsComponent } from './villains/villains.component';
import { RouterModule, Routes } from '@angular/router';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { VillainFacade } from '@wl/core-state';
import { ModalComponent } from '../modal/modal.component';
import { SharedModule } from '@wl/shared';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VillainsComponent }
];

@NgModule({
  declarations: [
    VillainsComponent,
    VillainDetailComponent,
    VillainListComponent,
    ModalComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [VillainFacade]
})
export class VillainsModule {}
