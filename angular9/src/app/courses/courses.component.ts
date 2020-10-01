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
    this.loadCourses();
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

  loadCourses() {
    this.courseService.all()
    .subscribe(courses => this.courses = courses);
  }

  refreshCourses() {
    this.resetSelectedcourse();
    this.loadCourses();
  }

  saveCourse(course) {
    if (course.id) {
      this.courseService.update(course)
      .subscribe(result => this.refreshCourses());
    } else {
      this.courseService.create(course)
      .subscribe(result => this.refreshCourses());
    }
  }

  deleteCourse(courseId) {
    this.courseService.delete(courseId)
    .subscribe(result => this.refreshCourses());
  }

  cancel() {
    this.resetSelectedcourse();
  }
}
