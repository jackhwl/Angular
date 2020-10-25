export { Project } from "./lib/projects/project";
export { ProjectsService } from './lib/projects/projects.service';
export { CoreDataModule } from './lib/core-data.module';

// Expose projects state
export { ProjectsState } from './lib/state/projects/projects.reducer';
export { SelectProject, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';