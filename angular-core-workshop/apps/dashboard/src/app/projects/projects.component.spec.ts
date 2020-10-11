import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ProjectsComponent } from './projects.component';
import { DebugElement } from '@angular/core';

describe('ProjectsComponent', () => {
  // Create my local test members
  let compnent: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let de: DebugElement;

  // Instantiate test bed
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent, 
        ProjectsListComponent, 
        ProjectDetailsComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    }).createComponent(ProjectsComponent);

    compnent = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have a primaryColor of `red`', () => {
    expect(compnent.primaryColor).toBe('red');
  })
});
