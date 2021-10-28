import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct, Rating } from '@ngrx-nx-workshop/api-interfaces';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { productsOpened } from './actions';
import * as selectors from '../selectors';

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[] | undefined> = this.store.select(
    selectors.getProducts
  );
  customerRatings$?: Observable<Map<string, Rating>>;

  constructor(
    private readonly store: Store<{ product: { products: Product[] } }>,
    private readonly ratingService: RatingService
  ) {
    this.store.dispatch(productsOpened());
  }

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map(arr => {
        const ratingsMap = new Map<string, Rating>();
        for (const productRating of arr) {
          ratingsMap.set(productRating.productId, productRating.rating);
        }
        return ratingsMap;
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
  }
}
