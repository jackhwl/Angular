import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const RESOURCE_URL = '/api/user';

@Injectable({
    providedIn: 'root'
})

export class UserRolesCrudResourceService {
    
    constructor(private httpClient: HttpClient) {}

    findAll(): Observable<UserRoles[]> {
        return this.httpClient.get<UserRoles[]>(RESOURCE_URL);
    }
    
    findOne(id: string): Observable<UserRoles> {
        return this.httpClient.get<UserRoles>(`${RESOURCE_URL}/${id}`);
    }
    
}

export interface UserRoles {
    prop: string;
}