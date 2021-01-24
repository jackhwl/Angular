import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@fem/api-interfaces';

const API_ENDPOINT = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  model = 'jobs';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Job[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Job>(this.getUrlWithId(id));
  }

  create(job: Job) {
    return this.http.post(this.getUrl(), job);
  }

  update(job: Job) {
    return this.http.put(this.getUrlWithId(job.id), job);
  }

  delete(job: Job) {
    return this.http.delete(this.getUrlWithId(job.id));
  }

  private getUrl() {
    return `${API_ENDPOINT}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
