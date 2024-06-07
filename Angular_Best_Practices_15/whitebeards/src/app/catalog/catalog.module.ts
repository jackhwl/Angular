import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [CatalogComponent],
  exports: [],
  providers: []
})

export class CatalogModule {}