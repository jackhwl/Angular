import { Product } from "@shared/product.model";
import { productsArray } from "./products-data";

export class ProductsService {
  getProducts() : Product[] {
    return productsArray
  }
}