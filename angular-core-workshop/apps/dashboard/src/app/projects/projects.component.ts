import { Component, OnInit } from '@angular/core';
import { Project, ProjectsFacade} from "@workshop/core-data";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(private facade: ProjectsFacade) {
    this.projects$ = facade.projects$;
    this.currentProject$ = facade.currentProject$;
  }

  ngOnInit(): void {
    this.getProjects();
    this.resetProject();
  }

  selectProject(project) {
    this.facade.selectProject(project.id);
  }

  resetProject() {
    this.facade.selectProject(null);
  }


  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  getProjects() {
    this.facade.getProjects();
  }

  createProject(project) {
    this.facade.createProject(project);
    this.resetProject();
  }

  updateProject(project) {
    this.facade.updateProject(project);
    this.resetProject();
  }
  
  deleteProject(project) {
    this.facade.deleteProject(project);
  }

  cancel() {
    this.resetProject();
  }
}
