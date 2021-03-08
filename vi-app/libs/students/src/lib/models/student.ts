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

// export interface StudentsEntity {
//   id: string | number; // Primary ID
// }
