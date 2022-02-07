import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { User } from "../models/model";
import { ErrorService } from "./error.service";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {

  constructor(private errorService: ErrorService) {}

  storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" }
  ];

  lastId = 1;
  private error = new Subject();
  error$ = this.error.asObservable();

  private findUserById = id => this.storedUsers.find(user => user.id === +id);


  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

}
