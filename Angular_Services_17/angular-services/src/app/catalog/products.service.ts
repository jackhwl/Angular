import { Product } from "@shared/product.model";
import { productsArray } from "./products-data";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ProductsService {
  getProducts() : Product[] {
    return productsArray
  }
}