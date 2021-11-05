import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  withLatestFrom,
  switchMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as productListActions from './product-list/actions';
import * as productDetailsActions from './product-details/actions';
import * as apiActions from './actions';
import * as selectors from './selectors';
import { ProductService } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef,
    private readonly store: Store
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map(products => apiActions.productsFetchedSuccess({ products })),
          catchError(() => of(apiActions.productsFetchedError()))
        )
      )
    )
  );

  handleFetchError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(apiActions.productsFetchedError),
        tap(() => {
          this.snackBar.open('Error fetching products', 'Error', {
            duration: 2500
          });
          // This is needed to   trigger change detection. The other ooption would
          // be to wrap 'open' call with setTimeout or Promise.resolve
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );

  fetchCurrentProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      withLatestFrom(this.store.select(selectors.getCurrentProductId)),
      switchMap(([, id]) =>
        this.productService.getProduct(id!).pipe(
          map(product => apiActions.productFetchedSuccess({ product })),
          catchError(() => of(apiActions.productFetchedError()))
        )
      )
    )
  );

  handleFetchProductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(apiActions.productFetchedError),
        tap(() => {
          this.snackBar.open('Error fetching product', 'Error', {
            duration: 2500
          });
          // This is needed to   trigger change detection. The other ooption would
          // be to wrap 'open' call with setTimeout or Promise.resolve
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );
}
