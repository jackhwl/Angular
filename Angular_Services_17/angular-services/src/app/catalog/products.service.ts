import { Product } from "@shared/product.model";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProductsService } from "@shared/products-service.interface";

@Injectable({ providedIn: 'root'})
export class ProductsService implements IProductsService {
  // private products: Subject<Product[]> = new Subject<Product[]>();

  constructor(private http: HttpClient) {}
  
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
    // fetch('/api/products')
    //   .then(response => response.json())
    //   .then(products => this.products.next(products)) 
    // return this.products
  }

}