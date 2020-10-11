import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectDetailsComponent } from './project-details.component';
import { Project } from '@workshop/core-data';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    component.currentProject = emptyProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
