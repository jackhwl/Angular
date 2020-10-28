import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadProjects, AddProject, UpdateProject, DeleteProject, Project, ProjectsState, selectAllProjects, selectCurrentProject, SelectProject} from "@workshop/core-data";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  selectedProject: Project;
  currentProject$: Observable<Project>;

  constructor( 
    private store: Store<ProjectsState>) {
      this.projects$ = store.pipe(select(selectAllProjects));
      this.currentProject$ = store.pipe(select(selectCurrentProject));
    }

  ngOnInit(): void {
    this.getProjects();
    this.resetProject();
  }

  selectProject(project) {
    this.store.dispatch(new SelectProject(project.id));
    //this.selectedProject = project;
    //console.log('selected', project);
  }

  resetProject() {
    // const emptyProject: Project = {
    //   id: null,
    //   title: '',
    //   details: '',
    //   percentComplete: 0,
    //   approved: false
    // }
    // this.selectProject(emptyProject);
    this.store.dispatch(new SelectProject(null));
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
    //this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
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

  cancel() {
    this.resetProject();
  }
}
