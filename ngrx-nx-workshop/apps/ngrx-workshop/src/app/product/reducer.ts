import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@ngrx-nx-workshop/api-interfaces';
import * as apiActions from './actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface GlobalState {
  product: ProductState;
}

export interface ProductState {
  products: EntityState<Product>;
}

// If your entity's id property is different you can spesify it during entity adapter creation.
export const productAdapter: EntityAdapter<Product> = createEntityAdapter();

const initState: ProductState = {
  products: productAdapter.getInitialState()
};

const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    products: productAdapter.upsertMany(products, state.products)
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => ({
    products: productAdapter.upsertOne(product, state.products)
    // const productsClone = state.products ? [...state.products] : [];
    // const indexOfProduct = productsClone.findIndex(p => p.id === product.id);

    // // Remove old one and replace with single product fetch,
    // productsClone.splice(indexOfProduct, 1, product);

    // return {
    //   ...state,
    //   products: productsClone
    // };
  }))
);

export function reducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return productsReducer(state, action);
}
