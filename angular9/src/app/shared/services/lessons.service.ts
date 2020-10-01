import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private lessons = [
    { title: 'Hello Angular3' },
    { title: 'Component Fundamentals' },
    { title: 'Template Driven Forms' },
    { title: 'Angular Services' },
    { title: 'Server Communication' },
    { title: 'Component Driven Architecture' },
    { title: 'Angular Routing' },
    { title: 'Unit Testing Fundamentals' },
  ];
  constructor() { }

  all() {
    return this.lessons;
  }
}
