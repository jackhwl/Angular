import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAllProjects, selectCurrentProject } from '..';
import { Project } from '../../projects/project';
import { ProjectsState } from './projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
    projects$: Observable<Project[]>;
    currentProject$: Observable<Project>;

    constructor(private store: Store<ProjectsState>) {
        this.projects$ = store.pipe(select(selectAllProjects));
        this.currentProject$ = store.pipe(select(selectCurrentProject));            
    }

    getProjects() {
      this.store.dispatch(new LoadProjects());
      //this.projects$ = this.projectsService.all();
    }
    
    selectProject(project) {
      this.store.dispatch(new SelectProject(project.id));
      //this.selectedProject = project;
      //console.log('selected', project);
    }

    createProject(project) {
      this.store.dispatch(new AddProject(project));

      // These will go away
      //this.getProjects();
      this.resetProject();
      // this.projectsService.create(project)
      // .subscribe(result => {
      //   this.getProjects();
      //   this.resetProject();
      // });
    }

    updateProject(project) {
      this.store.dispatch(new UpdateProject(project));
      //this.getProjects();
      this.resetProject();

      // this.projectsService.update(project)
      // .subscribe(result => {
      //   this.getProjects();
      //   this.resetProject();
      // });
    }
    
    deleteProject(project) {
      this.store.dispatch(new DeleteProject(project));
      //this.getProjects()
      // this.projectsService.delete(project.id)
      // .subscribe(result => this.getProjects());
    }


}