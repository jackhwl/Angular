import { Component, OnInit } from '@angular/core';
import { Project, ProjectsFacade, Customer, CustomersFacade, CustomersService} from "@workshop/core-data";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  customers2$: Observable<Customer[]>;
  customers$: Observable<Customer[]> = this.customersFacade.allCustomers$;
  projects$: Observable<Project[]> = this.projectsFacade.projects$;
  currentProject$: Observable<Project>;

  constructor(private projectsFacade: ProjectsFacade, private customersFacade: CustomersFacade, private cusSvc: CustomersService) {
    //this.projects$ = projectsFacade.projects$;
    this.currentProject$ = projectsFacade.currentProject$;
    //this.customers$ = customersFacade.allCustomers$;
    this.customers2$ = cusSvc.all();

  }

  ngOnInit(): void {
    this.getProjects();
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

  getProjects() {
    this.projectsFacade.getProjects();
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
