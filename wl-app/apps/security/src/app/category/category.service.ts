import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './category';
import { CATEGORIES_MOCK } from './categories-mock';

@Injectable()
export class CategoryService {

  constructor() { }
  
  getCategories(): Observable<Category[]> {
    return of<Category[]>(CATEGORIES_MOCK);
  }  
}
