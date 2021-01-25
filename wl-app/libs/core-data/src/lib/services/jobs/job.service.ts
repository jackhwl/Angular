import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { environment } from '@env/environment';
import { Job } from '@wl/api-interfaces';
import { ErrorService } from '@wl/core-data';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  model = 'jobs';
  constructor(
    private http: HttpClient,
    private location: Location,
    private errorService: ErrorService
  ) {}

  private getUrl() {
    const endpoint = environment.apiEndpoint;
    const api = this.location.normalize(endpoint);
    return `${api}/${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.http
      .get<Job[]>(this.getUrl())
      .pipe(this.errorService.retryAfter());
  }

  find(id: string) {
    return this.http
      .get<Job>(this.getUrlWithId(id))
      .pipe(this.errorService.retryAfter());
  }

  create(job: Job) {
    return this.http
      .post(this.getUrl(), job)
      .pipe(this.errorService.retryAfter());
  }

  update(job: Job) {
    return this.http
      .put(this.getUrlWithId(job.JobId), job)
      .pipe(this.errorService.retryAfter());
  }

  delete(job: Job) {
    return this.http
      .delete(this.getUrlWithId(job.JobId))
      .pipe(this.errorService.retryAfter());
  }
}
