import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const RESOURCE_URL = '<%= url %>';

@Injectable({
    providedIn: 'root'
})

export class <%= classify(name)%>CrudResourceService {
    
    constructor(private httpClient: HttpClient) {}

    findAll(): Observable<<%= classify(name)%>[]> {
        return this.httpClient.get<<%= classify(name)%>[]>(RESOURCE_URL);
    }
}

export interface <%= classify(name)%> {
    prop: string;
}