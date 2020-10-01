import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private model = 'courses';
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

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get(this.getUrl());
  }

  find(courseId) {
    
  }

  create(course) {
    return this.http.post(this.getUrl(), course);
  }

  update(course) {
    console.log('update COURCE!', course);
  }

  delete(courseId) {
    console.log('delete COURCE!', courseId);
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }
}
