import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { MaterialModule } from '@wl/material';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent }
];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  declarations: [HeroesComponent, HeroListComponent]
})
export class HeroesModule {}
