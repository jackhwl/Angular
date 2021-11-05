import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const productsFetchedError = createAction(
  '[Product API] products fetched error'
);

export const productsFetchedSuccess = createAction(
  '[Product API] products fetched success',
  props<{ products: BasicProduct[] }>()
);

export const productFetchedError = createAction(
  '[Product API] single product fetched error'
);

export const productFetchedSuccess = createAction(
  '[Product API] single product fetched success',
  props<{ product: Product }>()
);
