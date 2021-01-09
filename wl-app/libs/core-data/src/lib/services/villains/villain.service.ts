import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Villain } from '@wl/api-interfaces';
import { environment } from '@env/environment';
import { ToastService } from '../../notifications/toast.service';
import { ErrorService } from '../../error/error.service';

const api = `${environment.apiEndpoint}`;

@Injectable({ providedIn: 'root' })
export class VillainService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private errorService: ErrorService
  ) {}

  getUrl() {
    return `${environment.apiEndpoint}`;
  }

  logout() {
    return this.http.get(`${api}/logout`);
  }

  getProfile() {
    return this.http.get<any>(`${api}/profile`);
  }

  getVillain(id: number) {
    return this.http.get<Array<Villain>>(`${api}/villains/${id}`).pipe(
      map(villain => villain),
      tap(() =>
        this.toastService.openSnackBar('Villain retrieved successfully!', 'GET')
      ),
      this.errorService.catchReThrowError()
    );
  }

  getAll() {
    return this.http.get<Array<Villain>>(`${api}/villains`).pipe(
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
      .delete(`${api}/villain/${villain.id}`)
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
      .post<Villain>(`${api}/villain/`, villain)
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
      .put<Villain>(`${api}/villain/${villain.id}`, villain)
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
