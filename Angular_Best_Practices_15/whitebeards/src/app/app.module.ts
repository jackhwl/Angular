import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from "./catalog/catalog.component";
import { RegisterComponent } from "./user/register.component";
import { SignInComponent } from "./user/sign-in.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner.component";
import { CatalogRepositoryService } from './catalog/catalog-repository.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    RegisterComponent,
    SignInComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [CatalogRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
