import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CartService } from '@core/cart.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => this.products = products);
    setTimeout(() => this.productsService.refreshProducts(), 200)
  } 
  
  addToCart(product: Product) {
    this.cartService.add(product);
  }
}
