import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from "./product/product-list.component";
import { CategoryListComponent } from './category/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { LoginComponent } from './security/login.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  { 
    path: 'products', 
    component: ProductListComponent
  },
  { 
    path: 'productDetail/:id',
    component: ProductDetailComponent 
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'dashboard', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
