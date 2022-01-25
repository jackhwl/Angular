import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Address, Phone, Ticket, User } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
import { ErrorService } from "./error.service";

export const emptyAddress: Address = {
  id: null,
  addr1: "",
  addr2: "",
  //countryId: null,
  //cityId: null,
  postcode: "",
  ticketId: null,
  phoneIds: []
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class AddressService {

  constructor(private errorService: ErrorService) {}

  storedAddresses: Address[] = [
    {
      id: "a1",
      addr1: "111",
      addr2: "11",
      //countryId: "c1",
      //cityId: "ct1",
      postcode: "M1W2G2",
      ticketId: 0,
      phoneIds: []
    },
    {
        id: "a2",
        addr1: "222111",
        addr2: "22",
        //countryId: "c1",
        //cityId: "ct1",
        postcode: "M2W3G3",
        ticketId: 0,
        phoneIds: []
      },
      {
        id: "a3",
        addr1: "333",
        addr2: "33",
        //countryId: "c1",
        //cityId: "ct1",
        postcode: "",
        ticketId: 1,
        phoneIds: []
      },
      {
          id: "a4",
          addr1: "444111",
          addr2: "44",
          //countryId: "c1",
          //cityId: "ct1",
          postcode: "",
          ticketId: 1,
          phoneIds: []
        }
    ];

  private error = new Subject();
  error$ = this.error.asObservable();

  addressOfTicket(ticketId: number): Observable<Address[]> {
    const adds = this.storedAddresses.filter(a => a.ticketId == ticketId);
    return of(adds).pipe(delay(randomDelay()));
  }
}