import { Component, Inject } from '@angular/core';
import { Product } from '@shared/product.model';
import { engineers } from './engineers';
import { CartService } from '@core/cart.service';
import { IProductsService, IProductsServiceToken } from '@shared/products-service.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'bot-catalog',
  templateUrl: './squad-catalog.component.html',
  styleUrls: ['./squad-catalog.component.css'],
  providers: []
})
export class SquadCatalogComponent {
  squad: Observable<Product[]> = this.enginesService.getProducts();

  constructor(private cartService: CartService, 
    @Inject(IProductsServiceToken) private enginesService : IProductsService
  ) { }

  addToCart(engineer: Product) {
    this.cartService.add(engineer);
  }
}
