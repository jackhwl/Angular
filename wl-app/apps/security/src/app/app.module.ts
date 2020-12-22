import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { SecurityService } from './security/security.service';
import { CategoryListComponent } from './category/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './security/login.component';
import { AuthGuard } from './security/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './security/http-interceptor.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryListComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule
  ],
  providers: [ProductService, CategoryService, SecurityService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
