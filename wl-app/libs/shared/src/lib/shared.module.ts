import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule]
})
export class SharedModule {}
