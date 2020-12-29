import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@wl/material';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from '@wl/core-state';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, ModalComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
