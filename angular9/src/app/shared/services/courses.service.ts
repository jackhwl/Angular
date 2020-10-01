import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses = [
    {
      id: 1,
      title: 'Angular 19 Fundamentals',
      description: 'Learn the fundamentals of Angular 9',
      percentComplete: 26,
      favorite: true
    },
    {
      id: 2,
      title: 'Git commit message Best Practise',
      description: 'Learn the fundamentals of Git commit message',
      percentComplete: 62,
      favorite: true
    }
  ];

  constructor() { }

  all() {
    return this.courses;
  }

  find(courseId) {
    
  }

  create(course) {
    console.log('create COURCE!', course);
  }

  update(course) {
    console.log('update COURCE!', course);
  }

  delete(courseId) {
    console.log('delete COURCE!', courseId);
  }
}
