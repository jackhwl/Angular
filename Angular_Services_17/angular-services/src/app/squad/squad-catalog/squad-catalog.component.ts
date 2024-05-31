import { Component } from '@angular/core';
import { Product } from '@shared/product.model';
import { engineers } from './engineers';
import { CartService } from '@core/cart.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './squad-catalog.component.html',
  styleUrls: ['./squad-catalog.component.css'],
  providers: []
})
export class SquadCatalogComponent {
  squad: Product[] = engineers;

  constructor(private cartService: CartService) { }

  addToCart(engineer: Product) {
    this.cartService.add(engineer);
  }
}
