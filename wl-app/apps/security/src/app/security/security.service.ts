import { Observable, of } from 'rxjs';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
//import { LOGIN_MOCKS } from './login-mocks';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = "https://localhost:44381/api/security/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) { }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
    // this.securityObject.canAccessProducts = false;
    // this.securityObject.canAddProduct = false;
    // this.securityObject.canSaveProduct = false;
    // this.securityObject.canAccessCategories = false;
    // this.securityObject.canAddCategory = false;
    localStorage.removeItem("bearerToken");
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();
    // Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase()));
    // if (this.securityObject.userName !== "") {
    //     localStorage.setItem("bearerToken", this.securityObject.bearerToken);
    // }
    // return of<AppUserAuth>(this.securityObject);
    return this.http.post<AppUserAuth>(API_URL + "login", entity, httpOptions)
      .pipe(
        tap(resp => {
          // Use object assign to update the
          // current object
          Object.assign(this.securityObject, resp);
          
          // Store into local storage
          localStorage.setItem("bearerToken",
              this.securityObject.bearerToken);
        }));
  }
  
  logout(): void {
    this.resetSecurityObject();
  }

  hasClaim(claimType: any) : boolean {
    let ret: boolean = false;
    
    // See if an array of values was passed in.
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType);
    }
    else {
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
    

  private isClaimValid(claimType: string):boolean {
    let ret: boolean = false;
    let auth: AppUserAuth = null;
    let claimValue: string = '';
    
    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      }
      else {
        claimType = claimType.toLowerCase();
        // Get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true";
      }
      // Attempt to find the claim
      ret = auth.claims.find(c => c.claimType.toLowerCase() == claimType && c.claimValue == claimValue) != null;
    }
    
    return ret;
  }
    
}
