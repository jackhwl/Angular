import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';

export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<
  fromCustomers.CustomersState
>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

// Projects selectors
export const selectProjectState = createFeatureSelector<
  fromProjects.ProjectsState
>('projects');

export const selectProjectIds = createSelector(
  selectProjectState,
  fromProjects.selectIds
);

export const selectProjectEntities = createSelector(
  selectProjectState,
  fromProjects.selectEntities
);

export const selectAllProjects = createSelector(
  selectProjectState,
  fromProjects.selectAll
);
