import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const pageOpened = createAction('[Cart details Page] Opened');

export const purchaseSuccess = createAction('[Cart purchase] Success');
