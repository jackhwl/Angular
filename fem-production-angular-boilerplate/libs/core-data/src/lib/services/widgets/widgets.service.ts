import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Widget } from "@fem/api-interfaces";

const API_ENDPOINT = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  model = 'widgets';

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<Widget[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Widget>(this.getUrlWithId(id));
  }

  create(widget: Widget) {
    return this.http.post(this.getUrl(), widget);
  }

  update(widget: Widget) {
    return this.http.put(this.getUrlWithId(widget.id), widget);
  }

  delete(widget: Widget) {
    return this.http.delete(this.getUrlWithId(widget.id));
  }

  private getUrl() {
    return `${API_ENDPOINT}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
