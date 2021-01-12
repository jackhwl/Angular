import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { MaterialModule } from '@wl/material';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeroesComponent, HeroListComponent, HeroDetailComponent]
})
export class HeroesModule {}
