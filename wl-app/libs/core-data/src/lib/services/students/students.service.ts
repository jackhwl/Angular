import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Student } from '@wl/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  model = 'students';
  private students;
  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
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
