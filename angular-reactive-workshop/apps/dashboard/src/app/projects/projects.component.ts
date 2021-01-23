import { Component, OnInit } from '@angular/core';
import {
  Customer,
  CustomersService,
  NotificationsService,
  Project,
  ProjectsFacade
} from '@workshop/core-data';
import { Observable } from 'rxjs';

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
    private facade: ProjectsFacade,
    private ns: NotificationsService
  ) {
    this.projects$ = this.facade.projects$;
    this.currentProject$ = this.facade.currentProject$;
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
    //this.store.dispatch(new SelectProject(null));
    this.facade.selectProject(null);
  }

  selectProject(project) {
    this.facade.selectProject(project.id);
    //this.currentProject = project;
    //this.store.dispatch(new SelectProject(project.id));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.facade.getProjects();
    //this.store.dispatch(new LoadProjects());
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
    this.facade.createProject(project);
    //this.store.dispatch(new AddProject(project));
    // this.projectsService.create(project).subscribe(response => {
    this.ns.emit('Project created!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }

  updateProject(project) {
    this.facade.updateProject(project);
    //this.store.dispatch(new UpdateProject(project));
    // this.projectsService.update(project).subscribe(response => {
    this.ns.emit('Project saved!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }

  deleteProject(project) {
    this.facade.deleteProject(project);
    //this.store.dispatch(new DeleteProject(project));
    // this.projectsService.delete(project).subscribe(response => {
    this.ns.emit('Project deleted!');
    //this.getProjects();
    this.resetCurrentProject();
    // });
  }
}
