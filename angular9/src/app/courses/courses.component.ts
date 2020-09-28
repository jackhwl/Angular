import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentCourse = null;
  courses = [
    {
      id: 1,
      title: 'Angular 9 Fundamentals',
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

  ngOnInit(): void {
  }

  selectCourse(course) {
    console.log(course);
    this.currentCourse = course;
  }
  
  deleteCourse(courseId) {
    console.log('COURSE DELETED!', courseId);
  }
}
