import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from "./catalog/catalog.component";
import { RegisterComponent } from "./user/register.component";
import { SignInComponent } from "./user/sign-in.component";
import { CatalogRepositoryService } from './catalog/catalog-repository.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    RegisterComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [CatalogRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
