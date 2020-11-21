import { Component, OnInit } from '@angular/core';
import { Student } from '@wl/api-interfaces';
import { StudentsService } from '@wl/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'wl-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.students$ = this.studentsService.all();
  }
  selectedStudent(student) {
    console.log(student);
  }
  deleteStudent(student) {
    console.log('delete student', student);
  }
}
