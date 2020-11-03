import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Project } from "./project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects';
  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  load(id) {
    return this.httpClient.get<Project>(this.getUrlForId(id));
  }

  create(project: Project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project: Project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }

  delete(project: Project) {
    return this.httpClient.delete(this.getUrlForId(project.id));
  }
}
