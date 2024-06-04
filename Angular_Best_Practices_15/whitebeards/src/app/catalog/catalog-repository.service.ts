import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { IClass, ICourse } from '../catalog/class.model';
import { UserRepositoryService } from '../services/user-repository.service';

@Injectable()
export class CatalogRepositoryService {

  constructor(private userRepositoryService: UserRepositoryService) { }

  getCatalog(): Observable<IClass[]> {
    const subject = new Subject<IClass[]>();
    const classes = this.userRepositoryService.currentUser?.classes || [];
    const catalogWithEnrollmentStatus: IClass[] =
      courseCatalog.map(catalogClass => {
        return { ...catalogClass, enrolled: classes.includes(catalogClass.classId) };
      });
    setTimeout(() => { subject.next(catalogWithEnrollmentStatus); subject.complete(); }, 200);

    return subject;
  }

 }

const course: ICourse[] = [{
  courseNumber: 'PO101',
  courseName: 'Intro to Potions',
  creditHours: 3,
  description: '...',
}, {
  courseNumber: 'HIS105',
  courseName: 'Ancient History of Magic',
  creditHours: 4,
  description: '...'
}, {
  courseNumber: 'CH101',
  courseName: 'Intro to Charms',
  creditHours: 2,
  description: '...'
}, {
  courseNumber: 'CH205',
  courseName: 'Creating Advanced Charms',
  creditHours: 4,
  description: '...'
}, {
  courseNumber: 'SP101',
  courseName: 'Intro Spell Casting',
  creditHours: 3,
  description: '...'
}, {
  courseNumber: 'SP201',
  courseName: 'Advanced Spell Casting',
  creditHours: 4,
  description: '...'
}];

const courseCatalog: IClass[] = [{
  classId: '24ab7b14-f935-44c1-b91b-8598123ea54a',
  course: course[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 23,
  days: 'MWF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: 'cebbc5ba-f49a-4708-b3dc-51a346b3231e',
  course: course[0],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 9,
  days: 'MWF',
  time: '12:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: '6130cdd4-071a-4559-8072-35f0fbec5516',
  course: course[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 14,
  days: 'THF',
  time: '2:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'dd0343e9-50b2-4f1d-8b87-93c0b34f3d35',
  course: course[1],
  professor: 'Antonia Clavell',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: course[2],
  professor: 'Meriel Dufaux',
  seatsAvailable: 28,
  days: 'MW',
  time: '10:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '76d31fdc-e398-4d17-872b-e8222407e755',
  course: course[3],
  professor: 'Adranus Klaus',
  seatsAvailable: 28,
  days: 'THF',
  time: '1:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'd8bf81f4-3945-4a55-b5c4-663012246873',
  course: course[4],
  professor: 'Ragnvald Graupnar',
  seatsAvailable: 28,
  days: 'MWF',
  time: '12:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'c34b20fd-d2a0-4fb6-aeaa-2fc3a52e2e89',
  course: course[5],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: 'c5e73546-5f3c-4de1-8819-fe5bd3b6ef7e',
  course: course[2],
  professor: 'Phoebe Chabon',
  seatsAvailable: 28,
  days: 'WF',
  time: '2:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'fcf0652f-58c0-4eeb-b040-3eddb29e49e3',
  course: course[3],
  professor: 'Sycily Soule',
  seatsAvailable: 28,
  days: 'THF',
  time: '1:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'bb0a6a48-062e-4927-8257-28eb5842c0a6',
  course: course[4],
  professor: 'Heldebald Cincebeaux',
  seatsAvailable: 28,
  days: 'MTW',
  time: '10:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '996901ca-614e-4b92-887e-12528c88b880',
  course: course[5],
  professor: 'Gerlinda Weinschroot',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}];
