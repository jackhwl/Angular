import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { MaterialModule } from '@wl/material';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { StudentsListComponent } from '../students-list/students-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudentsFacade } from '@wl/core-state';
import { mockEmptyStudent, mockStudent, mockStudentsFacade } from '@wl/testing';
import { Student } from '@wl/api-interfaces';

describe('StudentsComponent', () => {
  // Create my local test members
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let de: DebugElement;
  let studentsFacade: StudentsFacade;

  // Instantiate test bed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StudentsComponent,
        StudentsListComponent,
        StudentDetailsComponent
      ],
      providers: [{ provide: StudentsFacade, useValue: mockStudentsFacade }],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
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

  describe('should on save call studentsFacade', () => {
    it('createStudent', () => {
      const spy = jest.spyOn(studentsFacade, 'createStudent');

      component.saveStudent(mockEmptyStudent);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockEmptyStudent);
    });

    it('updateStudent', () => {
      const spy = jest.spyOn(studentsFacade, 'updateStudent');

      component.saveStudent(mockStudent);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockStudent);
    });

    it('deleteStudent', () => {
      const spy = jest.spyOn(studentsFacade, 'deleteStudent');

      component.deleteStudent(mockStudent);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockStudent);
    });

    it('should call studentsService.delete on deleteStudent', () => {
      spyOn(studentsFacade, 'deleteStudent').and.callThrough();

      component.deleteStudent(mockStudent);

      expect(studentsFacade.deleteStudent).toHaveBeenCalledWith(mockStudent);
    });
  });
});
