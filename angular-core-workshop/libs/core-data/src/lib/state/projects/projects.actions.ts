import { Action } from '@ngrx/store';
import { Project } from "../../projects/project";

export enum ProjectsActionTypes {
    ProjectSelected = '[Projects] Seleted',
    AddProject = '[Projects] Add Data',
    UpdateProject = '[Projects] Update Data',
    DeleteProject = '[Projects] Delete Data',
}

export class SelectProject implements Action {
    readonly type = ProjectsActionTypes.ProjectSelected;
    constructor(private payload: Project) {}
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

export type ProjectActions = SelectProject | AddProject | UpdateProject | DeleteProject;
