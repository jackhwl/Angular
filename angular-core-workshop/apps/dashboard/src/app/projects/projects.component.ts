import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from "@workshop/core-data";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  selectedProject: Project;

  constructor(private projectsService: ProjectsService) {

  }

  ngOnInit(): void {
    this.getProjects();
  }

  selectProject(project) {
    this.selectedProject = project;
    console.log('selected', project);
  }

  getProjects() {
    this.projects$ = this.projectsService.all();
    
  }
  cancel() {
    this.selectProject(null);
  }
}
