import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent }
];

@NgModule({
  declarations: [HeroesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HeroesModule {}
