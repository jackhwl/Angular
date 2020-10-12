import { Project } from "../../projects/project";

const initialProjects: Project[] = [
    {
      id: '1',
      title: 'Project One',
      details: 'This is a sample project',
      percentComplete: 20,
      approved: false,
      //customerId: null
    },
    {
      id: '2',
      title: 'Project Two',
      details: 'This is a sample project',
      percentComplete: 40,
      approved: false,
      //customerId: null
    },
    {
      id: '3',
      title: 'Project Three',
      details: 'This is a sample project',
      percentComplete: 100,
      approved: true,
      //customerId: null
    }
  ];

// 01 Define the shape of my state
export interface ProjectsState {
    projects: Project[];
    selectedProjectId: string | null;
}

// 02 Define the initial state
export const initialState: ProjectsState = {
    projects: initialProjects,
    selectedProjectId: null
}

// 03 Build the MOST simplest reducer
export function projectsReducers(state = initialState, action): ProjectsState  {
    switch(action.type) {
        default:
            return state;
    }
}