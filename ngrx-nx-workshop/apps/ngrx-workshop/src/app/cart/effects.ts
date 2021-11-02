import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of, timer } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import * as productDetailsActions from '../product/product-details/actions';
import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

@Injectable()
export class CartEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productDetailsActions.addToCart),
      mergeMap(({ productId }) =>
        this.cartService.addProduct(productId).pipe(
          map(() => actions.addToCartSuccess()),
          // passing the productId to the Error, so it can be restored
          catchError(() => of(actions.addToCartError({ productId })))
        )
      )
    )
  );

  handleAddProductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addToCartError),
        tap(({ productId }) => {
          this.snackBar.open(
            `Could not add item(${productId}) to the cart`,
            'Error',
            {
              duration: 2500
            }
          );
          // This is needed to   trigger change detection. The other ooption would
          // be to wrap 'open' call with setTimeout or Promise.resolve
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );

  fetchCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map(cartItems => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() => of(actions.fetchCartItemsError()))
        )
      )
    )
  );

  init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );
}
