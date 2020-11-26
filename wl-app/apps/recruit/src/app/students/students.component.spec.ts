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


describe('StudentsComponent', () => {
  // Create my local test members
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let de: DebugElement;
  let studentsService: StudentsService;
  
  const mockStudentsService = {

  }
  // Instantiate test bed
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsComponent, StudentsListComponent, StudentDetailsComponent ],
      providers: [{provide: StudentsService, useValue: mockStudentsService}],
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
    studentsService = de.injector.get(StudentsService);
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
});
