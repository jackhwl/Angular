import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './Projects.actions';
import { ProjectsState } from './Projects.reducer';
import { selectAllProjects, selectCurrentProject } from '..';
import { Observable } from 'rxjs';
import { Project } from '../../projects/project.model';
import { Customer } from '../../customers/customer.model';
import {
  AddProject,
  DeleteProject,
  LoadProjects,
  SelectProject,
  UpdateProject
} from './Projects.actions';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(private store: Store<ProjectsState>) {
    this.projects$ = this.store.pipe(select(selectAllProjects));
    this.currentProject$ = this.store.pipe(select(selectCurrentProject));
  }

  selectProject(projectId) {
    //this.currentProject = project;
    this.store.dispatch(new SelectProject(projectId));
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
    //this.projects$ = this.projectsService.all();
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
  }
}
