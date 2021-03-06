export { Project } from "./lib/projects/project.model";
export { ProjectsService } from './lib/projects/projects.service';
export { CoreDataModule } from './lib/core-data.module';
export { ProjectsFacade } from './lib/state/projects/projects.facade';

export { Customer } from './lib/customers/customer.model';
export { CustomersService } from './lib/customers/customers.service';
export { CustomersFacade } from './lib/state/customers/customers.facade';

// Expose projects state
export { selectAllProjects, selectCurrentProject } from './lib/state'
export { ProjectsState } from './lib/state/projects/projects.reducer';
export { SelectProject, LoadProjects, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';