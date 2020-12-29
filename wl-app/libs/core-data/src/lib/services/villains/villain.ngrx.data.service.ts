import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { Villain } from '@wl/api-interfaces';

@Injectable({ providedIn: 'root' })
export class VillainNgrxDataService extends EntityCollectionServiceBase<
  Villain
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Villain', serviceElementsFactory);
  }
}
