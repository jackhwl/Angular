import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@wl/core-data';
import { CoreStateModule } from '@wl/core-state';
import { MaterialModule } from '@wl/material';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { StudentsComponent } from './students/students.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { FormsModule } from '@angular/forms';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [AppComponent, StudentsComponent, StudentsListComponent, HomeComponent, StudentDetailsComponent, HeaderComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    RoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
