import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '../projects/project.model';

import * as fromProjects from './projects/projects.reducer';
import * as fromCustomers from './customers/customers.reducer';

// Updated the shapre of the entire application state
export interface AppState {
    projects: fromProjects.ProjectsState,
    customers: fromCustomers.CustomersState
}

// Add in feature reducer into combined reducer
export const reducers: ActionReducerMap<AppState> = {
    projects: fromProjects.projectsReducer,
    customers: fromCustomers.customersReducer
}

// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false
}

export const selectProjectState = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const  selectProjectIds = createSelector(selectProjectState, fromProjects.selectProjectIds);
export const  selectProjectEntities = createSelector(selectProjectState, fromProjects.selectProjectEntities);
export const  selectAllProjects = createSelector(selectProjectState, fromProjects.selectAllProjects);
export const  selectCurrentProjectId = createSelector(selectProjectState, fromProjects.getSelectedProjectId);
export const  selectCurrentProject = createSelector(
    selectProjectEntities, 
    selectCurrentProjectId, 
    (projectEntities, projectId) => projectId ? projectEntities[projectId] : emptyProject
)


// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

// export const selectCustomersProjects = createSelector(
//   selectAllCustomers,
//   selectAllProjects,
//   (customers, projects) => {
//     return customers.map(customer => ({
//       ...customer,
//       projects: projects.filter(project => project.customerId === customer.id)
//     }));
//   }
// );