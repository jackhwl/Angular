import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesService } from '../shared/services/courses.service';

import { CoursesComponent } from './courses.component';

const coursesServiceStub = {
  all: () => {
    return {
      subscribe: () => {}
    }
  }
};

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      providers: [{provide: CoursesService, useValue: coursesServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
