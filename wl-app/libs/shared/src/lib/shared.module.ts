import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@wl/material';
import { UiSloganModule } from '@wl/ui-slogan';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UiSloganModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UiSloganModule,
    TranslateModule
  ]
})
export class SharedModule {}
