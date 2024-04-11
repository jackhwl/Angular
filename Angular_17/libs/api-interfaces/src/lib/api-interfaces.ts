export interface BaseEntity {
  id?: string | null;
}

export interface Challenge extends BaseEntity {
  title: string;
  description: string;
  completed: boolean;
  repo_url: string;
  comment: string;
  user_id: string;
}

export interface Note extends BaseEntity {
  title: string;
  content: string;
  type: NoteTypeEnum;
  user_id: string;
}

export enum NoteTypeEnum {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  LINK = 'link',
}

export interface Flashcard extends BaseEntity {
  title: string;
  description: string;
  question: string;
  answer: string;
  user_id: string;
}

export interface Feature extends BaseEntity {
  title: string;
  description: string;
  remote_uri: string;
  api_uri: string;
  healthy: boolean;
}

export interface CompanyFeatures extends BaseEntity {
  company_id: string;
  remote_id: string;
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  company_id: string;
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  MENTOR = 'mentor',
  APPRENTICE = 'apprentice',
  USER = 'user',
}

export interface Company extends BaseEntity {
  name: string;
  description: string;
}

export interface Workshop extends BaseEntity {
  title: string;
  description: string;
  date: Date;
  topic: string;
  instructor_id: string;
}

export interface Matter extends BaseEntity {
  description: string;
}