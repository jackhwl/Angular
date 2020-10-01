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
    this.courses = this.courseService.courses;
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
  
  saveCourse() {
    console.log('SAVE COPURCE!');
  }

  deleteCourse(courseId) {
    console.log('COURSE DELETED!', courseId);
  }

  cancel() {
    this.resetSelectedcourse();
  }
}
