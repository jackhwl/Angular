import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillainsComponent } from './villains/villains.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VillainsComponent }
];

@NgModule({
  declarations: [VillainsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VillainsModule {}
