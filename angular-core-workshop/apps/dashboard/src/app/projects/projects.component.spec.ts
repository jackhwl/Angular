import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { Project, ProjectsService } from '@workshop/core-data';
import { By } from '@angular/platform-browser';

import { ProjectsComponent } from './projects.component';
import { DebugElement } from '@angular/core';

describe('ProjectsComponent', () => {
  // Create my local test members
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let de: DebugElement;

  const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false,
  }

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

    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have a primaryColor of `red`', () => {
    expect(component.primaryColor).toBe('red');
  });

  it('should select a project', () => {
    component.selectProject(emptyProject);
    expect(component.selectedProject).toBe(emptyProject);
  });

  it('should display primaryColor', ()=> {
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('red');
  });
  
  it('should update h1 to new primaryColor', () => {
    const h1 = de.query(By.css('h1'));
    component.primaryColor = 'black';
    fixture.detectChanges();
    expect(h1.nativeElement.innerText).toBe('black');
  })
});
