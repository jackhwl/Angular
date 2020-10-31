import { Action } from '@ngrx/store';
import { Project } from "../../projects/project";

export enum ProjectsActionTypes {
    ProjectSelected = '[Projects] Seleted',
    LoadProjects = '[Projects] Load Data',
    ProjectsLoaded = '[Projects] Data Loaded',
    
    AddProject = '[Projects] Add Data',
    ProjectsAdded = '[Projects] Data Added',

    UpdateProject = '[Projects] Update Data',

    DeleteProject = '[Projects] Delete Data',
    ProjectDeleted = '[Projects] Data Deleted',
}

export class SelectProject implements Action {
    readonly type = ProjectsActionTypes.ProjectSelected;
    constructor(public payload: Project) {}
}

export class LoadProjects implements Action {
    readonly type = ProjectsActionTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
    readonly type = ProjectsActionTypes.ProjectsLoaded;
    constructor(public payload: Project[]) {}
}

export class AddProject implements Action { 
    readonly type = ProjectsActionTypes.AddProject;
    constructor(public payload: Project) {}
}

export class ProjectAdded implements Action { 
    readonly type = ProjectsActionTypes.ProjectsAdded;
    constructor(public payload: Project) {}
}

export class UpdateProject implements Action { 
    readonly type = ProjectsActionTypes.UpdateProject;
    constructor(private payload: Project) {}
}

export class DeleteProject implements Action { 
    readonly type = ProjectsActionTypes.DeleteProject;
    constructor(public payload: Project) {}
}

export class ProjectDeleted implements Action { 
    readonly type = ProjectsActionTypes.ProjectDeleted;
    constructor(public payload: Project) {}
}

export type ProjectActions = SelectProject 
    | LoadProjects 
    | ProjectsLoaded 
    | AddProject 
    | ProjectAdded 
    | UpdateProject 
    | DeleteProject
    | ProjectDeleted;
