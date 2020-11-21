import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '@wl/api-interfaces';

@Component({
  selector: 'wl-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent {
  @Input() students: Student[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
