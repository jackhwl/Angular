import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedCommonModule } from '@vi/shared/common';

import { VillainsComponent } from './containers/villains.component';
import { VillainDetailComponent } from './components/villain-detail/villain-detail.component';
import { VillainListComponent } from './components/villain-list/villain-list.component';
import { VillainFacade } from './services/villain.facade';
import { ModalComponent } from './components/modal/modal.component';

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
  imports: [SharedCommonModule, RouterModule.forChild(routes)],
  providers: [VillainFacade]
})
export class VillainsModule {}
