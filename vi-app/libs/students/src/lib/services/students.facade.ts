import { Injectable } from '@angular/core';
import { Student } from '../models/student';

import { StudentService } from './';
import { Subject } from 'rxjs';

@Injectable()
export class StudentsFacade {
  private allStudents = new Subject<Student[]>();
  private selectedStudent = new Subject<Student>();
  private mutations = new Subject();

  allStudents$ = this.allStudents.asObservable();
  selectedStudent$ = this.selectedStudent.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private studentService: StudentService //private ns: NotificationsService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  selectStudent(student: Student) {
    this.selectedStudent.next(student);
  }

  loadStudents() {
    this.studentService
      .all()
      .subscribe((students: Student[]) => this.allStudents.next(students));
  }

  saveStudent(student: Student) {
    if (student.id) {
      this.updateStudent(student);
    } else {
      this.createStudent(student);
    }
  }

  createStudent(student: Student) {
    return this.studentService.create(student).subscribe(_ => {
      //this.ns.emit('Student created!');
      this.reset();
    });
  }

  updateStudent(student: Student) {
    return this.studentService.update(student).subscribe(_ => {
      //this.ns.emit('Student updated!');
      this.reset();
    });
  }

  deleteStudent(student: Student) {
    return this.studentService.delete(student.id).subscribe(_ => this.reset());
  }
}
