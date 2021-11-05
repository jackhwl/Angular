import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducer';
import * as routerSelectors from '../router/selectors';

const getProductState = createFeatureSelector<ProductState>('product');

export const getProducts = createSelector(
  getProductState,
  state => state.products
);

export const getCurrentProductId = routerSelectors.getRouterParam('productId');

export const getCurrentProduct = createSelector(
  getProducts,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products.find(p => p.id === id);
  }
);
