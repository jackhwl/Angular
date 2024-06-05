import { NgModule } from '@angular/core';

import { CatalogComponent } from './catalog.component';
import { CatalogRepositoryService } from './catalog-repository.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [CatalogComponent],
  exports: [],
  providers: [CatalogRepositoryService]
})

export class CatalogModule {}