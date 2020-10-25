import { Action } from '@ngrx/store';
import { Project } from "../../projects/project";

export enum ProjectsActionTypes {
    ProjectSelected = '[Projects] Seleted',
    LoadProjects = '[Projects] Load Data',
    AddProject = '[Projects] Add Data',
    UpdateProject = '[Projects] Update Data',
    DeleteProject = '[Projects] Delete Data',
}

export class SelectProject implements Action {
    readonly type = ProjectsActionTypes.ProjectSelected;
    constructor(private payload: Project) {}
}

export class LoadProjects implements Action {
    readonly type = ProjectsActionTypes.LoadProjects;
    constructor(private payload: Project[]) {}c
}

export class AddProject implements Action { 
    readonly type = ProjectsActionTypes.AddProject;
    constructor(private payload: Project) {}
}

export class UpdateProject implements Action { 
    readonly type = ProjectsActionTypes.UpdateProject;
    constructor(private payload: Project) {}
}

export class DeleteProject implements Action { 
    readonly type = ProjectsActionTypes.DeleteProject;
    constructor(private payload: Project) {}
}

export type ProjectActions = SelectProject | LoadProjects | AddProject | UpdateProject | DeleteProject;
