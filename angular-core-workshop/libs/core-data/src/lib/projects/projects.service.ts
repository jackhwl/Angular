import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects';
  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get(`${BASE_URL}${this.model}`);
  }
}
