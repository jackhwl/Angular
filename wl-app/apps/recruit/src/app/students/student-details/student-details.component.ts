import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '@wl/api-interfaces';

@Component({
  selector: 'wl-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  currentStudent: Student;
  @Input() set student(value: Student) {
    this.currentStudent = {...value}
  };
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
}
