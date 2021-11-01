import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as cartSelectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-cart',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent {
  cartItemsCounter$ = this.store.select(cartSelectors.getCartItemsCount);

  constructor(private readonly store: Store<{}>) {}
}
