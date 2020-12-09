import { Component, OnInit } from '@angular/core';

interface BaseEntity {
  id: string | null;
}

interface Project extends BaseEntity {
  title: string;
  description: string;
  completed: boolean;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}

const newProject: Project = {
  id: null,
  title: '',
  description: '',
  completed: false
}

const project1: Project = {
  id: '1',
  title: 'p title',
  description: 'p description',
  completed: true
}

const project2: Project = {
  id: '2',
  title: 'p title 2',
  description: 'p description 2',
  completed: false
}

const projects: Project[] = [
  project1, project2
]

const initialProjectsState: ProjectsState = {
  projects,
  currentProject: newProject
}

interface ClientsState {
  clients: Client[];
  currentClient: Client;
}

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
}

const superClient: Client = {
  id: '1111',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Bacon, Inc',
}

const vipClient: Client = {
  id: '222',
  firstName: 'Peter2',
  lastName: 'Porker2',
  company: 'Bacon2, Inc',
}

const clients: Client[] = [
  superClient, vipClient
]

const initialClientsState: ClientsState = {
  clients,
  currentClient: newClient
}

interface AppState {
  clientsState: ClientsState,
  projectsState: ProjectsState
}

const appState: AppState = {
  clientsState: initialClientsState,
  projectsState: initialProjectsState
}



class ProjectStore {
  state: ProjectsState;
  reducer;

  constructor(state: ProjectsState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }
}

class ClientStore {
  state: ClientsState;
  reducer;

  constructor(state: ClientsState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }
}

interface Action {
  type: string;
  payload?: any;
}

const CLIENT_LOAD = 'load';
const CLIENT_SELECT = 'select';
const CLIENT_CLEAR = 'clear';
const CLIENT_CREATE = 'create';
const CLIENT_UPDATE = 'update';
const CLIENT_DELETE = 'delete';

const loadClient = (state, clients): ClientsState => {
  return {
    clients,
    currentClient: state.currentClient
  }
}
const selectClient = (state, client): ClientsState => {
  return {
    clients: state.clients,
    currentClient: client
  }
}
const clearClient = (state): ClientsState => {
  return {
    clients: state.clients,
    currentClient: null
  }
}

const createClient = (state, client): ClientsState => {
  return {
    clients: [...state.clients, client],
    currentClient: state.currentClient
  }
}

const updateClient = (state, client): ClientsState => {
  return {
    clients: state.clients.map(c => c.id === client.id ? Object.assign({}, client) : c),
    currentClient: state.currentClient
  }
}

const deleteClient = (state, client): ClientsState => {
  return {
    clients: state.clients.filter(c => c.id !== client.id),
    currentClient: state.currentClient
  }
}

const clientReducer = (state: ClientsState, action: Action): ClientsState => {
  switch(action.type) {
    case CLIENT_LOAD:
      return loadClient(state, action.payload);
    case CLIENT_SELECT:
      return selectClient(state, action.payload);
    case CLIENT_CLEAR:
      return clearClient(state);
    case CLIENT_CREATE:
      return createClient(state, action.payload);
    case CLIENT_UPDATE:
      return updateClient(state, action.payload);
    case CLIENT_DELETE:
      return deleteClient(state, action.payload);
    default:
      return state;
  }
}

const  jack: Client = {
  id: '123',
  firstName: 'Jack',
  lastName: 'Huang',
  company: 'viGlobal'
}
const clientStore = new ClientStore(initialClientsState, clientReducer);
const aClient = clientStore.select('currentClient');
clientStore.dispatch({type: CLIENT_CREATE, payload: jack});
const allClients = clientStore.select('clients');

const tango = allClients


@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  echo = tango;
}
