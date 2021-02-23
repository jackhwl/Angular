import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SloganComponent } from './components/slogan/slogan.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SloganComponent],
  exports: [SloganComponent]
})
export class SharedUiSloganModule {}
