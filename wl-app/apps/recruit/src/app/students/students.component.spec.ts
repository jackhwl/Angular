import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { MaterialModule } from '@wl/material';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudentsService } from '@wl/core-data';
import { StudentsFacade } from '@wl/core-state';
import { Student } from '@wl/api-interfaces';
import { of } from 'rxjs';


describe('StudentsComponent', () => {
  // Create my local test members
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let de: DebugElement;
  let studentsService: StudentsService;
  let studentsFacade: StudentsFacade;
  
  const mockStudentsService = {
    all: () => {
      return {
        subscribe: () => {}
      }
    },
    delete: () => {
      return {
        subscribe: () => {}
      }
    }
  }

  const mockStudentsFacade = {
    loadStudents: () => {},
    selectStudent: () => {},
    deleteStudent: () => {},
    saveStudent: () => {},
    updateStudent: () => {},
    createStudent: () => {},
    mutations$: of(true)
  }

  // Instantiate test bed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsComponent, StudentsListComponent, StudentDetailsComponent ],
      providers: [{provide: StudentsFacade, useValue: mockStudentsFacade}],
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
    studentsFacade = de.injector.get(StudentsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a primaryColor of `red`', () => {
    expect(component.primaryColor).toBe('red');
  });

  it('should display primaryColor', () => {
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toBe('red'); // or use innerHTML, not innerText
  });

  it('should update h1 to new primaryColor', () => {
    const h1 = de.query(By.css('h1'));
    component.primaryColor = 'black';
    fixture.detectChanges();
    expect(h1.nativeElement.textContent).toBe('black');
  });

  it('should call studentsService.delete on deleteStudent', () => {
    const student: Student = {
      "id": "8",
      "firstName": "Greg",
      "middleName": null,
      "lastName": "Djordjevic",
      "email": "djordjevic.6@osu.edu",
      "schoolName": "(Removed School)",
      "year": "2L",
      "graduationDate": "-0001-11-30"
    };

    spyOn(studentsFacade, 'deleteStudent').and.callThrough();
    component.deleteStudent(student);
    expect(studentsFacade.deleteStudent).toHaveBeenCalledWith(student);
  });
});
