import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectsState,
  LoadProjects,
  AddProject,
  UpdateProject,
  DeleteProject,
  initialProjects,
  selectAllProjects,
  selectCurrentProject,
  SelectProject
} from '@workshop/core-data';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService
  ) {
    this.projects$ = this.store.pipe(select(selectAllProjects));
    this.currentProject$ = this.store.pipe(select(selectCurrentProject));
    // this.projects$ = this.store.pipe(
    //   select('projects'),
    //   map(data => data.entities),
    //   map(data => Object.keys(data).map(k => data[k]))
    //   //map((projectsState: ProjectsState) => projectsState.entities)
    // );
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    //this.currentProject = emptyProject;
    this.store.dispatch(new SelectProject(null));
  }

  selectProject(project) {
    //this.currentProject = project;
    this.store.dispatch(new SelectProject(project.id));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
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
    // this.projectsService.create(project).subscribe(response => {
    this.ns.emit('Project created!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    // this.projectsService.update(project).subscribe(response => {
    this.ns.emit('Project saved!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
    // this.projectsService.delete(project).subscribe(response => {
    this.ns.emit('Project deleted!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }
}
