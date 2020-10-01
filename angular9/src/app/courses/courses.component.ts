import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  selectedCourse = null;
  courses = null;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    this.resetSelectedcourse();
    this.courses = this.courseService.all();
  }

  resetSelectedcourse() {
    const emptyCourse =     
    {
      id: null,
      title: '',
      description: '',
      percentComplete: 0,
      favorite: false
    };
    this.selectedCourse = emptyCourse;
  }

  selectCourse(course) {
    console.log(course);
    this.selectedCourse = course;
  }
  
  saveCourse(course) {
    if (course.id) {
      this.courseService.update(course);
    } else {
      this.courseService.create(course);
    }
  }

  deleteCourse(courseId) {
    this.courseService.delete(courseId);
  }

  cancel() {
    this.resetSelectedcourse();
  }
}
