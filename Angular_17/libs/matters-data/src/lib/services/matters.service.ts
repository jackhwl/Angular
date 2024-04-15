import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matter } from '@proto/api-interfaces';

// TEMPORARY
const API_URL = 'http://localhost:3300/api';

@Injectable({
  providedIn: 'root',
})
export class MattersService {
  model = 'matters';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Matter[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Matter>(this.getUrlWithId(id));
  }

  create(matter: Matter) {
    return this.http.post(this.getUrl(), matter);
  }

  update(matter: Matter) {
    return this.http.patch(this.getUrlWithId(matter.id), matter);
  }

  delete(matter: Matter) {
    return this.http.delete(this.getUrlWithId(matter.id));
  }

  private getUrl() {
    return `/${this.model}`;
  }

  private getUrlWithId(id: string | undefined | null) {
    return `${this.getUrl()}/`;
  }
}
