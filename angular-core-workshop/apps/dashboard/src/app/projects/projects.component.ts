import { Component, OnInit } from '@angular/core';
import { Project, ProjectsFacade, Customer, CustomersFacade, CustomersService} from "@workshop/core-data";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  customers$: Observable<Customer[]> = this.customersFacade.allCustomers$;
  projects$: Observable<Project[]> = this.projectsFacade.projects$;
  currentProject$: Observable<Project> = this.projectsFacade.currentProject$;

  constructor(private projectsFacade: ProjectsFacade, private customersFacade: CustomersFacade) { }

  ngOnInit(): void {
    this.projectsFacade.getProjects();
    this.resetProject();
    this.customersFacade.loadCustomers();
  }

  selectProject(project) {
    this.projectsFacade.selectProject(project.id);
  }

  resetProject() {
    this.projectsFacade.selectProject(null);
  }


  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsFacade.createProject(project);
    this.resetProject();
  }

  updateProject(project) {
    this.projectsFacade.updateProject(project);
    this.resetProject();
  }
  
  deleteProject(project) {
    this.projectsFacade.deleteProject(project);
  }

  cancel() {
    this.resetProject();
  }
}
