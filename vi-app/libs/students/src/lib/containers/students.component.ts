import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentsFacade, StudentsStoreFacade } from '../services';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vi-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]> = this.studentsFacade.allStudents$;
  selectedStudent$: Observable<Student> = this.studentsFacade.selectedStudent$;
  error$: Observable<any> = this.studentsFacade.error$;

  primaryColor = 'red';

  constructor(
    private studentsFacade: StudentsFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reset();
    this.studentsFacade.mutations$.subscribe(_ => this.reset());
  }

  reset() {
    this.loadStudents();
    this.selecteStudent(null);
  }

  selecteStudent(student: Student) {
    this.studentsFacade.selectStudent(student);
  }

  loadStudents() {
    this.studentsFacade.loadStudents();
  }

  saveStudent(student) {
    if (student.id) {
      this.studentsFacade.updateStudent(student);
    } else {
      this.studentsFacade.createStudent(student);
    }
  }

  deleteStudent(student) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    //if(confirm("Are you sure to delete "))
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.studentsFacade.deleteStudent(student);
      }
    });
  }

  // getStudents() {
  //   this.students$ = this.studentsService.all();
  // }

  // saveStudent2(student) {
  //   if (!student.id) {
  //     this.createStudent(student);
  //   } else {
  //     this.updateStudent(student);
  //   }
  // }

  // resetCurrentStudent() {
  //   this.selecteStudent(null);
  // }

  // createStudent(student) {
  //   this.studentsService.create(student)
  //     .subscribe(response => {
  //       this.ns.emit('Student created!');
  //       this.getStudents();
  //       this.resetCurrentStudent();
  //     });
  // }

  // updateStudent(student) {
  //   this.studentsService.update(student)
  //     .subscribe(response => {
  //       this.ns.emit('Student updated!');
  //       this.getStudents();
  //       this.resetCurrentStudent();
  //     });
  // }

  // deleteStudent(student) {
  //   this.studentsService.delete(student.id)
  //     .subscribe(result => this.getStudents());
  // }
}
