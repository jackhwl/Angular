import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import * as apiActions from './actions';

interface ProductState {
  products?: Product[];
}

const initState: ProductState = {
  products: undefined
};

const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    products: [...products]
  }))
);

export function reducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return productsReducer(state, action);
}

export interface GlobalState {
  product: ProductState;
}
