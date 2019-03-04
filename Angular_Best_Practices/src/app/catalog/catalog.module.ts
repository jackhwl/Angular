import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogRepositoryService } from './catalog-repository.service';

@NgModule({
    imports: [ RouterModule, SharedModule ],
    exports: [ ],
    declarations: [ CatalogComponent ],
    providers: [ CatalogRepositoryService ]
})
export class CatalogModule {};