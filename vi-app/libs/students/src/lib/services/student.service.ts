import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { environment } from '@vi/shared/environments';
import { Student } from '../models/student';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  model = 'students';
  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private errorService: ErrorService
  ) {}

  getUrl() {
    const endpoint = environment.inMemorryData
      ? 'api'
      : environment.apiEndpoint;
    const api = this.location.normalize(endpoint);
    return `${api}/${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient
      .get<Student[]>(this.getUrl())
      .pipe(this.errorService.retryAfter());
  }

  find(studentId) {
    return this.httpClient
      .get<Student>(this.getUrlForId(studentId))
      .pipe(this.errorService.retryAfter());
  }

  create(student) {
    return this.httpClient
      .post(this.getUrl(), student)
      .pipe(this.errorService.retryAfter());
  }

  update(student) {
    return this.httpClient
      .put(this.getUrlForId(student.id), student)
      .pipe(this.errorService.retryAfter());
  }

  delete(studentId) {
    return this.httpClient
      .delete(this.getUrlForId(studentId))
      .pipe(this.errorService.retryAfter());
  }
}
