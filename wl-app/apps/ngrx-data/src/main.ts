import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppDevModule } from './app/app-dev.module';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  //.bootstrapModule(AppModule)
  .bootstrapModule(AppDevModule)
  .catch(err => console.error(err));
