import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@wl/material';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, ModalComponent],
  imports: [MaterialModule, BrowserModule, RoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
