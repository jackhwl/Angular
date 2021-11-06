import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicProduct, Rating } from '@ngrx-nx-workshop/api-interfaces';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import { map, shareReplay } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { productsOpened } from './actions';
import * as selectors from '../selectors';
import { GlobalState } from '../reducer';
import { CallState, LoadingState } from '../../shared/call_state';

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
  productsCallState$: Observable<CallState> = this.store.select(
    selectors.getProductsCallState
  );
  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly store: Store<GlobalState>,
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
