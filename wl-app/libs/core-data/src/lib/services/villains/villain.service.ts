import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Villain } from '@wl/api-interfaces';
import { environment } from '@env/environment';
import { ToastService } from '../../notifications/toast.service';
import { ErrorService } from '../../error/error.service';

@Injectable({ providedIn: 'root' })
export class VillainService {
  constructor(
    private http: HttpClient,
    private location: Location,
    private toastService: ToastService,
    private errorService: ErrorService
  ) {}

  getUrl() {
    var api = this.location.normalize(environment.apiEndpoint);
    return `${api}/villains`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  // logout() {
  //   return this.http.get(`${api}/logout`);
  // }

  // getProfile() {
  //   return this.http.get<any>(`${api}/profile`);
  // }

  getVillain(id: number) {
    return this.http.get<Array<Villain>>(this.getUrlForId(id)).pipe(
      map(villain => villain),
      tap(() =>
        this.toastService.openSnackBar('Villain retrieved successfully!', 'GET')
      ),
      this.errorService.catchReThrowError()
    );
  }

  getAll() {
    return this.http.get<Array<Villain>>(this.getUrl()).pipe(
      map(villains => villains),
      tap(() =>
        this.toastService.openSnackBar(
          'Villains retrieved successfully!',
          'GET'
        )
      ),
      this.errorService.retryAfter()
    );
  }

  delete(villain: Villain) {
    return this.http
      .delete(this.getUrlForId(villain.id))
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(
            `Villain ${villain.name} deleted`,
            'DELETE'
          )
        )
      );
  }

  add(villain: Villain) {
    return this.http
      .post<Villain>(this.getUrl(), villain)
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(
            `Villain ${villain.name} added`,
            'POST'
          )
        )
      );
  }

  update(villain: Villain) {
    return this.http
      .put<Villain>(this.getUrlForId(villain.id), villain)
      .pipe(
        tap(() =>
          this.toastService.openSnackBar(
            `Villain ${villain.name} updated`,
            'PUT'
          )
        )
      );
  }
}
