import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@wl/api-interfaces';

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
    return this.http.put(this.getUrlWithId(job.JobId), job);
  }

  delete(job: Job) {
    return this.http.delete(this.getUrlWithId(job.JobId));
  }

  private getUrl() {
    return `${API_ENDPOINT}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
