import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { CatalogRepositoryService } from './catalog-repository.service';
import { FilterClassesService } from './filter-classes.service';

@NgModule({
    imports: [ RouterModule, SharedModule ],
    exports: [ ],
    declarations: [ CatalogComponent ],
    providers: [ CatalogRepositoryService, FilterClassesService ]
})
export class CatalogModule {};