import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppDevModule } from './app/app-dev.module';
import { environment } from '@vi/shared/environments';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(environment.production ? AppModule : AppDevModule)
  .catch(err => console.error(err));
