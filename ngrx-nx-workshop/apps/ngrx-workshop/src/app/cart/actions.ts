import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const timerTick = createAction('[Cart Effects] perioding timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction('[Cart API] fetch items error');

export const addToCartSuccess = createAction('[Cart API] add product success');

export const addToCartError = createAction(
  '[Cart API] add product error',
  props<{ productId: string }>()
);