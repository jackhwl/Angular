import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './core/containers/app.component';

import {
  HttpClientInMemoryWebApiModule,
  InMemoryDbService
} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { environment } from '@vi/shared/environments';

@NgModule({
  imports: environment.inMemorryData
    ? [
        AppModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false,
          delay: 300,
          passThruUnknownUrl: true
        })
      ]
    : [AppModule],
  providers: environment.inMemorryData
    ? [{ provide: InMemoryDataService, useExisting: InMemoryDbService }]
    : [],
  bootstrap: [AppComponent]
})
export class AppDevModule {}
