import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { environment } from '../../environments/environment';
import { DefaultDataServiceConfig, NgrxDataModule } from 'ngrx-data';
import { entityConfig } from './entity-metadata';
import { NgrxDataToastService } from './ngrx-data-toast.service';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgrxDataModule.forRoot(entityConfig),
    //environment.production
    false ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {
  constructor(toastService: NgrxDataToastService) {}
}
