export { Project } from "./lib/projects/project";
export { ProjectsService } from './lib/projects/projects.service';
export { CoreDataModule } from './lib/core-data.module';

// Expose projects state
export { ProjectsState, initialProjects, selectAllProjects } from './lib/state/projects/projects.reducer';
export { SelectProject, LoadProjects, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';