import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Student } from '../models/student';

@Injectable({ providedIn: 'root' })
export class StudentNgrxDataService extends EntityCollectionServiceBase<
  Student
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Student', serviceElementsFactory);
  }
}
