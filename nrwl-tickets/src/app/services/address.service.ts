import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Address, Address_vm, Phone, Ticket, User } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
import { ErrorService } from "./error.service";
import { PhoneService } from "./phone.service";

export const emptyAddress: Address = {
  id: null,
  addr1: "",
  addr2: "",
  countryId: null,
  cityId: null,
  postcode: "",
  ticketId: null,
  phoneIds: []
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class AddressService {

  constructor(private errorService: ErrorService, private phoneService: PhoneService) {}

  storedAddresses: Address[] = [
    {
      id: "a1",
      addr1: "111",
      addr2: "11",
      countryId: "c1",
      cityId: "ct1",
      postcode: "M1W2G2",
      ticketId: 0,
      phoneIds: [],
    },
    {
        id: "a2",
        addr1: "222111",
        addr2: "22",
        countryId: "c1",
        cityId: "ct1",
        postcode: "M2W3G3",
        ticketId: 0,
        phoneIds: [],
      },
      {
        id: "a3",
        addr1: "333",
        addr2: "33",
        countryId: "c1",
        cityId: "ct1",
        postcode: "",
        ticketId: 1,
        phoneIds: []
      },
      {
          id: "a4",
          addr1: "444111",
          addr2: "44",
          countryId: "c1",
          cityId: "ct1",
          postcode: "",
          ticketId: 1,
          phoneIds: []
        }
    ];

  private error = new Subject();
  error$ = this.error.asObservable();

  addressOfTicket(ticketId: number): Observable<Address[]> {
    const adds = this.getAll().filter(a => a.ticketId == ticketId);
    return of(adds).pipe(delay(randomDelay()));
  }

  updateAddresses(ticketId: number, addresses: Address[]): Observable<Address[]> {
    const newAddresses = addresses.filter(a => a.id === null).map(a => ({...a, id: this.getId()}))
    const existingAddresses = addresses.filter(a => a.id !== null)
    //console.log(newAddresses)
    this.storedAddresses = this.getAll().filter(a => a.ticketId !== ticketId).concat(newAddresses, existingAddresses);

    //console.log(this.storedAddresses)
    
    //this.storedAddresses = this.getAll().filter(a => !existingAddresses.map(a=>a.id).includes(a.id) ).concat(existingAddresses);
    //this.storedAddresses = this.getAll().filter(a0 => !addresses.map(a=>a.ticketId).includes(a0.ticketId) ).concat(addresses);
    //console.log(this.storedAddresses)
    const adds = this.getAll().filter(a => a.ticketId === ticketId)
    //console.log(adds)
    return of(adds).pipe(delay(randomDelay()));
  }

  getId() {
    return 'a'+Math.random()
  }

  getAll(): Address[] {
    return this.storedAddresses.map(a => ({...a, phoneIds: this.phoneService.storedPhones.filter(p => p.addressId === a.id).map(p => p.id)}))
  }

  getAddressFromVm(address_vm: Address_vm): Address {
    return {
      id: address_vm.id,
      addr1: address_vm.addr1,
      addr2: address_vm.addr2,
      postcode: address_vm.postcode,
      ticketId: address_vm.ticketId,
      countryId: address_vm.countryId,
      cityId: address_vm.cityId,
      phoneIds: address_vm.phones.map(p => p.id),
    };
  }

}