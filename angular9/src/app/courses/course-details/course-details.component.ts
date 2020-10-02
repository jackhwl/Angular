import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  @Input() course;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
