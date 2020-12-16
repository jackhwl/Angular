import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[];
  securityObject: AppUserAuth = null;

  constructor (private productService: ProductService, private router: Router, private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }


  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  addProduct(): void {
    this.router.navigate(['/productDetail', -1]);
  }
}
