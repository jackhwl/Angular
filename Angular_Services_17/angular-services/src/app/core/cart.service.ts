import { Injectable, computed, signal } from "@angular/core";
import { Product } from "@shared/product.model";

@Injectable({ providedIn: 'root' })
export class CartService {
    cart = signal<Product[]>([]);
    
    add(product: Product) {
        this.cart.update(oldCart => [...oldCart, product]);
    }
    
    remove(product: Product) {
        this.cart.update(oldCart => oldCart.filter(p => p !== product));
    }   

    get cartTotal() {
        return computed(() => this.cart().reduce((prev, next) => {
          let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
          return prev + next.price * discount;
        }, 0));
      }
}