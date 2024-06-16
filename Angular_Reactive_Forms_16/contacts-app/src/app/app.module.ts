import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { InMemoryContactsApi } from './contacts/in-memory-contacts.service';
import { DateValueAccessorDirective } from './date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelectorComponent } from './profile-icon-selector/profile-icon-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    EditContactComponent,
    DateValueAccessorDirective,
    ProfileIconSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryContactsApi, { delay: 200 }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
