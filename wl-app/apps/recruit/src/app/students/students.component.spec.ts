import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { MaterialModule } from '@wl/material';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';


describe('StudentsComponent', () => {
  // Create my local test members
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let de: DebugElement;

  // Instantiate test bed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsComponent, StudentsListComponent, StudentDetailsComponent ],
      imports: [
        MaterialModule, FormsModule, HttpClientModule, BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a primaryColor of `red`', () => {
    expect(component.primaryColor).toBe('red');
  });
});
