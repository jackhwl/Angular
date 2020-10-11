import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from "@workshop/core-data";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  @Input() project: Project;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

}
