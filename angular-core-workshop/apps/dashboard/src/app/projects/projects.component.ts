import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      id: '1',
      title: 'Project One',
      details: 'This is a sample project',
      percentComplete: 20,
      approved: false,
    },
    {
      id: '2',
      title: 'Project Two',
      details: 'This is a sample project',
      percentComplete: 40,
      approved: false,
    },
    {
      id: '3',
      title: 'Project Three',
      details: 'This is a sample project',
      percentComplete: 100,
      approved: true,
    },
  ];
  selectedProject;
  constructor() {}

  ngOnInit(): void {}

  selectProject(project) {
    this.selectedProject = project;
    console.log('selected', project);
  }

  cancel() {
    this.selectProject(null);
  }
}
