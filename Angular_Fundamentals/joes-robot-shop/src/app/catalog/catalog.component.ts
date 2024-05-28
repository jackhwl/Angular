import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: IProduct[] = [];
  filter: string = '';
  
  constructor(private cartSvc: CartService, private productSvc: ProductService) { }
  
  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => this.products = products);
  }

  addToCart(product: IProduct): void {
    this.cartSvc.add(product)
  }

  getFilteredProducts() {
    return this.filter === '' ? this.products : this.products.filter(product => product.category === this.filter)
  }
}
