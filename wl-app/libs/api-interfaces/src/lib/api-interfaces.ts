export interface Message {
  message: string;
}

export interface BaseEntity {
  id: string | null;
}

export interface Student extends BaseEntity {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  schoolName: string;
  year: string;
  graduationDate: string;
}

export interface Person {
  id: number;
  name: string;
  saying: string;
}

export interface User {
  firstName: string;
  lastName: string;
}

export class AppUser {
  userName: string = '';
  password: string = '';
}

export class AppUserClaim {
  claimId: string = '';
  userId: string = '';
  claimType: string = '';
  claimValue: string = '';
}

export class AppUserAuth {
  userName: string = '';
  bearerToken: string = '';
  isAuthenticated: boolean = false;
  claims: AppUserClaim[] = [];
  // canAccessProducts: boolean = false;
  // canAddProduct: boolean = false;
  // canSaveProduct: boolean = false;
  // canAccessCategories: boolean = false;
  // canAddCategory: boolean = false;
}

export interface Job {
  JobId: number;
  JobName: string;
  OfficeName: string;
  DepartmentName: string;
  ApplicationYear: string;
  JobSummarySA: string;
  JobDescriptionSA: string;
  OfficeID: number;
  JobCategoryID: number;
}
