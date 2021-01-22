import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';

import { Project } from './../../projects/project.model';
import { ProjectsService } from './../../projects/projects.service';
import {
  AddProject,
  ProjectAdded,
  LoadProjects,
  ProjectsActionTypes,
  ProjectsLoaded
} from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  // loadProjects$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('ProjectsActionTypes.LoadProjects'),
  //     fetch({
  //       run: (action: LoadProjects) => {
  //         return nullSafeIsEquivalent;
  //       }
  //     })
  //   )
  // );

  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProjects,
    {
      run: (action: LoadProjects, state: ProjectsState) => {
        return this.projectsService
          .all()
          .pipe(map((res: Project[]) => new ProjectsLoaded(res)));
      },
      onError: () => {}
    }
  );

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: (action: AddProject, state: ProjectsState) => {
        return this.projectsService
          .create(action.payload)
          .pipe(map((res: Project) => new ProjectAdded(res)));
      },
      onError: () => {}
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
