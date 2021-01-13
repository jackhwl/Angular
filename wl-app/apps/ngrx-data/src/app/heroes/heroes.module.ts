import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { MaterialModule } from '@wl/material';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';

import { environment } from '@env/environment';
import { PluralHttpUrlGenerator } from '@wl/core-data';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent }
];

@NgModule({
  declarations: [HeroesComponent, HeroListComponent, HeroDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: { root: environment.apiEndpoint }
    },
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
  ]
})
export class HeroesModule {}
