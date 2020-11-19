import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@wl/core-data';
import { CoreStateModule } from '@wl/core-state';
import { MaterialModule } from '@wl/material';
import { RoutingModule } from './routing.module';
import { StudentsComponent } from './students/students.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';

@NgModule({
  declarations: [AppComponent, StudentsComponent, StudentsListComponent, HomeComponent, StudentDetailsComponent],
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
