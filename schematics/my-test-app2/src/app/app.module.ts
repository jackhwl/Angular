import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeterComponent } from './peter/peter.component';
import { MikeComponent } from './mike/mike.component';

@NgModule({
  declarations: [AppComponent, PeterComponent, MikeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
