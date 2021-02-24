import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMaterialModule } from '@vi/shared/ui/custom-material';
import { SharedUiSloganModule } from '@vi/shared/ui/slogan';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    SharedUiSloganModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SharedUiSloganModule,
    TranslateModule
  ]
})
export class SharedCommonModule {}
