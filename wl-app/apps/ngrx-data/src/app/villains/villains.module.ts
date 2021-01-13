import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@wl/material';
import { VillainsComponent } from './villains/villains.component';
import { RouterModule, Routes } from '@angular/router';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VillainFacade } from '@wl/core-state';
import { environment } from '@env/environment';
import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';
import { PluralHttpUrlGenerator } from '@wl/core-data';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VillainsComponent }
];

@NgModule({
  declarations: [
    VillainsComponent,
    VillainDetailComponent,
    VillainListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: environment.ngrxData
    ? [
        VillainFacade,
        {
          provide: DefaultDataServiceConfig,
          useValue: { root: environment.apiEndpoint }
        },
        { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
      ]
    : [VillainFacade]
})
export class VillainsModule {}
