import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { appRoutes } from './routes'
import { AppComponent }  from './components/app.component';
import { NavBarComponent }  from './components/nav-bar.component';
import { CatelogComponent } from "./components/catelog.component";
import { RegisterComponent } from "./components/sign-in.component";
import { SignInComponent } from "./components/sign-in.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner.component";
import { DataRepositoryService } from "./services/data-repository.service"
import { AccountMenuComponent } from "./components/account-menu.component";

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    CatelogComponent,
    RegisterComponent,
    SignInComponent,
    LoadingSpinnerComponent,
    AccountMenuComponent
  ],
  providers: [ DataRepositoryService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
