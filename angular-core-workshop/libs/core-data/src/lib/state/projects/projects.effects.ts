// HELPFUL SNIPPET
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Project } from './../../projects/project';
import { ProjectsService } from './../../projects/projects.service';
import { AddProject, ProjectAdded, DeleteProject, ProjectDeleted, LoadProjects, ProjectsLoaded, ProjectsActionTypes } from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({providedIn: 'root'})
export class ProjectsEffects {
  @Effect() loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsState) => {
        return this.projectsService.all()
            .pipe(
                map((res: Project[]) => new ProjectsLoaded(res))
            )
    },
    onError: () => {}
  })

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.AddProject, {
    run: (action: AddProject, state: ProjectsState) => {
        return this.projectsService.create(action.payload)
            .pipe(
                map((res: Project) => new ProjectAdded(res))
            )
    },
    onError: () => {}
  })

  @Effect() deleteProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.DeleteProject, {
    run: (action: DeleteProject, state: ProjectsState) => {
        return this.projectsService.delete(action.payload)
            .pipe(
                map(_ => new ProjectDeleted(action.payload))
            )
    },
    onError: () => {}
  })

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}