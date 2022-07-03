import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ButtonComponentModule } from '@angular14/shared/components';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, ButtonComponentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
