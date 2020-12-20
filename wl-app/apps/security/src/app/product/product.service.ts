import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { PRODUCTS_MOCK } from './products-mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = "https://localhost:44381/weatherforecast";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    //return of<Product[]>(PRODUCTS_MOCK);
    return this.http.get<Product[]>(API_URL);    
  }
  
  getProduct(id: number): Observable<Product> {
    // let product: Product;
  
    // product = PRODUCTS_MOCK
    //   .find(product => product.productId === id)
  
    // return of<Product>(product);
    return this.http.get<Product>(API_URL + id.toString())
  }  
}
