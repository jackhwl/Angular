import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Project } from './../../projects/project.model';
import { ProjectsService } from './../../projects/projects.service';
import { ProjectsActionTypes } from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProjects,
    {
      run: () => {},
      onError: () => {}
    }
  );

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: () => {},
      onError: () => {}
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
