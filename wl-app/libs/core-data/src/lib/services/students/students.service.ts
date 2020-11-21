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
  all() {
    return this.httpClient.get<Student[]>(this.getUrl());
  }
}
