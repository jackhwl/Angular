import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject$ = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this.cartItemsSubject$.asObservable();

  constructor(private readonly http: HttpClient) {}

  addProduct(id: string): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/add/${id}`, {});
    //.subscribe(arr => this.cartItemsSubject$.next(arr));
  }

  removeProduct(id: string): void {
    this.http
      .post<CartItem[]>(`/api/cart/remove/${id}`, {})
      .subscribe(arr => this.cartItemsSubject$.next(arr));
  }

  removeAll(): void {
    this.http
      .post<CartItem[]>(`/api/cart/clear`, {})
      .subscribe(arr => this.cartItemsSubject$.next(arr));
  }

  getCartProducts(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`/api/cart/cart-content`);
  }

  purchase(purchaseItems: CartItem[]): Observable<boolean> {
    return this.http.post<boolean>(`/api/cart/purchase`, purchaseItems);
  }
}
