import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, AppUserAuth } from '@wl/api-interfaces';
//import { LOGIN_MOCKS } from './login-mocks';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { environment } from '@env/environment';

const API_URL = 'https://localhost:44381/api/security/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  private securityObject0 = new BehaviorSubject<AppUserAuth>(new AppUserAuth());

  securityObject$ = this.securityObject0.asObservable();

  model = 'login';
  constructor(
    private http: HttpClient,
    private location: Location,
    private localStorageService: LocalStorageService
  ) {}

  getUrl() {
    const endpoint = environment.inMemorryData
      ? 'api'
      : environment.apiEndpoint;
    const api = this.location.normalize(endpoint);
    return `${api}/${this.model}`;
  }

  resetSecurityObject(): void {
    this.securityObject0.next(new AppUserAuth());
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    // this.securityObject.canAccessProducts = false;
    // this.securityObject.canAddProduct = false;
    // this.securityObject.canSaveProduct = false;
    // this.securityObject.canAccessCategories = false;
    // this.securityObject.canAddCategory = false;
    this.localStorageService.removeItem('bearerToken');
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();
    // Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase()));
    // if (this.securityObject.userName !== "") {
    //     this.localStorageService.setItem("bearerToken", this.securityObject.bearerToken);
    // }
    // return of<AppUserAuth>(this.securityObject);
    return this.http.post<AppUserAuth>(this.getUrl(), entity, httpOptions).pipe(
      tap(resp => {
        // Use object assign to update the
        // current object
        this.securityObject0.next(resp);
        Object.assign(this.securityObject, resp);

        // Store into local storage
        this.localStorageService.setItem(
          'bearerToken',
          this.securityObject.bearerToken
        );
      })
    );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  hasClaim(claimType: any): boolean {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType);
    } else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth = null;
    let claimValue: string = '';

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(':') >= 0) {
        let words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      // Attempt to find the claim
      ret =
        auth.claims.find(
          c =>
            c.claimType.toLowerCase() == claimType && c.claimValue == claimValue
        ) != null;
    }

    return ret;
  }
}
