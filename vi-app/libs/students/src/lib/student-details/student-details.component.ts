import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../models/student';

@Component({
  selector: 'vi-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  currentStudent: Student;
  @Input() set student(value: Student) {
    this.currentStudent = { ...value };
  }
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
}
