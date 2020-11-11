import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooolbarComponent } from './toolbar/tooolbar/tooolbar.component';
import { MaterialModule } from "@fem/material";

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [TooolbarComponent],
  declarations: [TooolbarComponent],
})
export class UiToolbarModule {}
