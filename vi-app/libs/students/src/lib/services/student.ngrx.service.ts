import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { environment } from '@vi/shared/environments';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentNgrxService {
  model = 'students';
  constructor(private httpClient: HttpClient, private location: Location) {}

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
    return this.httpClient.get<Student[]>(this.getUrl());
  }

  find(studentId) {
    return this.httpClient.get<Student>(this.getUrlForId(studentId));
  }

  create(student) {
    return this.httpClient.post(this.getUrl(), student);
  }

  update(student) {
    return this.httpClient.patch(this.getUrlForId(student.id), student);
  }

  delete(studentId) {
    return this.httpClient.delete(this.getUrlForId(studentId));
  }
}
