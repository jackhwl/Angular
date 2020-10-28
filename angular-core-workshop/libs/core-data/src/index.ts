export { Project } from "./lib/projects/project";
export { ProjectsService } from './lib/projects/projects.service';
export { CoreDataModule } from './lib/core-data.module';
export { ProjectsFacade } from './lib/state/projects/projects.facade';

// Expose projects state
export { selectAllProjects, selectCurrentProject } from './lib/state'
export { ProjectsState, initialProjects } from './lib/state/projects/projects.reducer';
export { SelectProject, LoadProjects, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';