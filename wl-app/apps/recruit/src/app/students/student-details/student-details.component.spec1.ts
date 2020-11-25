import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsComponent } from './student-details.component';

import { MaterialModule } from '@wl/material';
import { FormsModule } from '@angular/forms';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsComponent ],
      imports: [
        MaterialModule, FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
