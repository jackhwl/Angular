import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule, PluralHttpUrlGenerator } from '@wl/core-data';
import { AppStoreModule, CoreStateModule } from '@wl/core-state';
import { MaterialModule } from '@wl/material';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { StudentsComponent } from './students/students.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { FormsModule } from '@angular/forms';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SloganComponent } from './slogan/slogan.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NewsletterparentComponent } from './newsletterparent/newsletterparent.component';

import { DefaultDataServiceConfig, HttpUrlGenerator } from 'ngrx-data';
import { environment } from '@env/environment';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiEndpoint
};

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsListComponent,
    HomeComponent,
    NewsletterComponent,
    StudentDetailsComponent,
    HeaderComponent,
    SidenavListComponent,
    SloganComponent,
    NewsletterComponent,
    NewsletterparentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,

    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    //{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    //{ provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
