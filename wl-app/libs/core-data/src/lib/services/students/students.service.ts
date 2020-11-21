import { Injectable } from '@angular/core';
import { Student } from '@wl/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private students: Student[] =[
    {
      id: "1",
      firstName: "Alexander",
      middleName: "D",
      lastName: "Russo",
      email: "arusso1@uga.edu",
      schoolName: "University of Georgia, School of Law",
      year: "2L",
      graduationDate: "2016-05-01"
    },
    {
      id: "2",
      firstName: "Greg",
      middleName: null,
      lastName: "Djordjevic",
      email: "djordjevic.6@osu.edu",
      schoolName: "(Removed School)",
      year: "2L",
      graduationDate: "-0001-11-30"
    },
    {
      id: "3",
      firstName: "Cory",
      middleName: "L ",
      lastName: "Takeuchi",
      email: "coryt@uga.edu",
      schoolName: "University of Georgia, School of Law",
      year: "2L",
      graduationDate: "2016-05-01"
    },
    {
      id: "4",
      firstName: "Alexander",
      middleName: "D",
      lastName: "Russo",
      email: "arusso1@uga.edu",
      schoolName: "University of Georgia, School of Law",
      year: "2L",
      graduationDate: "2016-05-01"
    },
    {
      id: "5",
      firstName: "Tabitha",
      middleName: "Ashley ",
      lastName: "Ferrer",
      email: "tabbyferrer@yahoo.com",
      schoolName: "Howard University, School of Law",
      year: "Grad",
      graduationDate: "2014-05-01"
    },
    {
      id: "6",
      firstName: "Cindy",
      middleName: "C.",
      lastName: "Unegbu",
      email: "CCUnegbu@law.howard.edu",
      schoolName: "Howard University, School of Law",
      year: "Grad",
      graduationDate: "2014-05-01"
    }
  ]
  constructor() { }

  all() {
    return this.students;
  }
}
