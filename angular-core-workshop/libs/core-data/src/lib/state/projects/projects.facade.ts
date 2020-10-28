import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAllProjects, selectCurrentProject } from '..';
import { Project } from '../../projects/project';
import { ProjectsState } from './projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
    projects$: Observable<Project[]>;
    currentProject$: Observable<Project>;

    constructor(private store: Store<ProjectsState>) {
        this.projects$ = store.pipe(select(selectAllProjects));
        this.currentProject$ = store.pipe(select(selectCurrentProject));            
    }

}