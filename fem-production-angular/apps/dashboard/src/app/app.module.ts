import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@fem-production-angular/core-data';
import { CoreStateModule } from '@fem-production-angular/core-state';
import { MaterialModule } from '@fem-production-angular/material';
import { RoutingModule } from './routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsListComponent } from './widgets/widgets-list/widgets-list.component';
import { WidgetsDetailsComponent } from './widgets/widgets-details/widgets-details.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, WidgetsComponent, WidgetsListComponent, WidgetsDetailsComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
