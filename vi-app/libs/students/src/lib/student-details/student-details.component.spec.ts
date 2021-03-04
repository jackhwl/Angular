import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsComponent } from './student-details.component';

import { MaterialModule } from '@wl/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;
  const emptyStudent = {
    id: '0',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    schoolName: '',
    year: '',
    graduationDate: ''
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDetailsComponent],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    component.currentStudent = emptyStudent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
