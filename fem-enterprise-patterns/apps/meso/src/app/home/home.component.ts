import { Component, OnInit } from '@angular/core';

interface Project {
  id: string | null;
  title: string;
  description: string;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}

const project1: Project = {
  id: '1',
  title: 'p title',
  description: 'p description'
}

const project2: Project = {
  id: '2',
  title: 'p title 2',
  description: 'p description 2'
}

const projects: Project[] = [
  project1, project2
]

const initialState: ProjectsState = {
  projects,
  currentProject: project2
}

interface ClientsState {
  clients: Client[];
  currentClient: Client;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
}

const superClient: Client = {
  id: '1111',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Bacon, Inc',
}

const tango = superClient

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  echo = tango;
}
