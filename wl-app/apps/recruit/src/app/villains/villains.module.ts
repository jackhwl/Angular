import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@wl/shared';
import { VillainsComponent } from './villains/villains.component';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { VillainFacade } from '@wl/core-state';
import { ModalComponent } from '../modal/modal.component';
// import { environment } from '@env/environment';
// import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';
// import { PluralHttpUrlGenerator } from '@wl/core-data';

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
  // environment.ngrxData ?
  // ( environment.inMemorryData ?
  //   [ VillainFacade,
  //   //{ provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
  // ]
  // :
  //   [ VillainFacade,
  //     //{ provide: DefaultDataServiceConfig, useValue: { root: environment.apiEndpoint } },
  //     //{ provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
  //   ] )
  //   :
  //   [VillainFacade]
})
export class VillainsModule {}
