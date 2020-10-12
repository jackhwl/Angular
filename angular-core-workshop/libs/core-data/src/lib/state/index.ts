import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProjects from './projects/projects.reducer';

// Updated the shapre of the entire application state
export interface AppState {
    projects: fromProjects.ProjectsState
}

// Add in feature reducer into combined reducer
export const reducers: ActionReducerMap<AppState> = {
    projects: fromProjects.projectsReducers
}