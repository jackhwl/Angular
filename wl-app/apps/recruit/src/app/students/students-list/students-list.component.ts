import { Component, Input, OnInit } from '@angular/core';
import { Student } from '@wl/api-interfaces';

@Component({
  selector: 'wl-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {
  @Input() students: Student[]
  constructor() { }

  ngOnInit(): void {
  }

}
