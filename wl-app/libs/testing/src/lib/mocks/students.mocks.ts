import { Student } from '@wl/api-interfaces';
import { of } from 'rxjs';

export const mockStudentsService = {
    all: () => of([]),
    find: () => of({...mockStudent}),
    create: () => of({...mockStudent}),
    update: () => of({...mockStudent}),
    delete: () => of({...mockStudent}),
}

export const mockStudentsFacade = {
    loadStudents: () => {},
    selectStudent: () => {},
    deleteStudent: () => {},
    saveStudent: () => {},
    updateStudent: () => {},
    createStudent: () => {},
    mutations$: of(true)
}

export const mockStudent:Student  = {
    "id": "8",
    "firstName": "Greg",
    "middleName": null,
    "lastName": "Djordjevic",
    "email": "djordjevic.6@osu.edu",
    "schoolName": "(Removed School)",
    "year": "2L",
    "graduationDate": "-0001-11-30"
}

export const mockEmptyStudent:Student = {
    "id": null,
    "firstName": "mockEmpty",
    "middleName": null,
    "lastName": "mockEmpty",
    "email": "mockEmpty",
    "schoolName": "mockEmpty",
    "year": "",
    "graduationDate": "-0001-11-30"
}
