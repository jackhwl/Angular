import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { ProductService } from "./product.service";
import { Product } from './product';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  categories: Category[];
  securityObject: AppUserAuth = null;

  constructor (private categoryService: CategoryService, 
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private location: Location, 
    private securityService: SecurityService) {
        this.securityObject = securityService.securityObject;
  }


  ngOnInit() {
    this.getCategories();
    // Get the passed in product id
    let id = +this.route.snapshot.paramMap.get('id');
    // Create or load a product
    this.createOrLoadProduct(id);
  }

  private initProduct(): void {
    // Create a new product
    this.product = new Product({
      introductionDate: new Date(),
      price: 1,
      url: "http://www.fairwaytech.com"
    });
  }

  private createOrLoadProduct(id: number) {
    if (id == -1) {
      // Create new product object
      this.initProduct();
    }
    else {
      // Get a product from product service
      this.productService.getProduct(id)
        .subscribe(product => this.product = product);
    }
  }

  private getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  saveData(): void {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.goBack();
  }
}
