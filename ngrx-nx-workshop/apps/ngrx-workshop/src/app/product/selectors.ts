import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productAdapter, ProductState } from './reducer';
import * as routerSelectors from '../router/selectors';

const getProductState = createFeatureSelector<ProductState>('product');

export const getProductsState = createSelector(
  getProductState,
  state => state.products
);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProducts = createSelector(getProductsState, selectAll);

const getProductsEntities = createSelector(getProductsState, selectEntities);

export const getCurrentProductId = routerSelectors.getRouterParam('productId');

export const getCurrentProduct = createSelector(
  getProductsEntities,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products[id];
  }
);
