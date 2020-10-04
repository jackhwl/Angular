import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesService } from '../shared/services/courses.service';

import { CoursesComponent } from './courses.component';

const coursesServiceStub = {
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
};

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let debug: DebugElement;
  let coursesService: CoursesService;

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
    debug = fixture.debugElement;
    coursesService = debug.injector.get(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call coursesService.delete on deleteCourse', () => {
    spyOn(coursesService, 'delete').and.callThrough();
    component.deleteCourse(2);
    expect(coursesService.delete).toHaveBeenCalledWith(2);
  });
});
