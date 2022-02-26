import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharkDirective } from './shark.directive';
import { PupComponent } from './pup.component';
import { RainbowDirective } from './rainbow.directive';
import { NgxUnlessDirective } from './ngx-unless.directive';
import { CardComponent } from './card.component';
import { CardListComponent } from './card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SharkDirective,
    PupComponent,
    RainbowDirective,
    NgxUnlessDirective,
    CardComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
