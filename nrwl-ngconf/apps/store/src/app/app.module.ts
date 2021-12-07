import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { StoreSharedUiModule } from '@nrwl-ngconf/store/shared-ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    StoreSharedUiModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
