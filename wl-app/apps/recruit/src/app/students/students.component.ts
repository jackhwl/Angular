import { Component, OnInit } from '@angular/core';
import { Student } from '@wl/api-interfaces';
import { NotificationsService, StudentsService } from '@wl/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'wl-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  student: Student;
  primaryColor = 'red';

  constructor(private studentsService: StudentsService, private ns: NotificationsService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.students$ = this.studentsService.all();
  }

  selecteStudent(student) {
    this.student = student;
  }

  saveStudent(student) {
    if (!student.id) {
      this.createStudent(student);
    } else {
      this.updateStudent(student);
    }
  }

  resetCurrentStudent() {
    this.selecteStudent(null);
  }

  createStudent(student) {
    this.studentsService.create(student)
      .subscribe(response => {
        this.ns.emit('Student created!');
        this.getStudents();
        this.resetCurrentStudent();
      });
  }

  updateStudent(student) {
    this.studentsService.update(student)
      .subscribe(response => {
        this.ns.emit('Student updated!');
        this.getStudents();
        this.resetCurrentStudent();
      });
  }

  deleteStudent(student) {
    this.studentsService.delete(student.id)
      .subscribe(result => this.getStudents());
  }
}
