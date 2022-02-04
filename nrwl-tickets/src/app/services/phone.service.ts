
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Address, Phone } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
import { ErrorService } from "./error.service";

function randomDelay() {
return Math.random() * 1000;
}

@Injectable()
export class PhoneService {

    constructor(private errorService: ErrorService) {}

    storedPhones: Phone[] = [
        { id: 1, type: "home", number: "111", addressId: "a1" },
        { id: 2, type: "mobile", number: "222", addressId: "a1" },
        { id: 3, type: "home", number: "333", addressId: "a2" },
        { id: 4, type: "mobile", number: "444", addressId: "a2" }
    ];

    phones(addressIds: string[]) {
        return of(this.storedPhones.filter(p => addressIds.includes(p.addressId))).pipe(delay(randomDelay()));
    }

    addPhone(): Observable<Phone> {
        let id = Math.max(...this.storedPhones.map(p=> p.id));
        const newPhone: Phone = { id: ++id, type: "", number: "", addressId: "" }
        this.storedPhones = this.storedPhones.concat(newPhone);
        return of(newPhone).pipe(delay(randomDelay()));
        //const updatedTicket = { ...updates, phones: [...updates.phones] };
        //updatedTicket.phones.push({ id: -1, type: "", number: "" });
    
        // this.storedTickets = this.storedTickets.map(t =>
        //   t.id === updatedTicket.id ? updatedTicket : t
        // );
    
        //return of(updatedTicket).pipe(delay(randomDelay()));
      }
    
      deletePhone(id: number): Observable<Boolean> {
        this.storedPhones = this.storedPhones.filter(p => p.id !== id);
        return of(true).pipe(delay(randomDelay()));
        //const updatedTicket = { ...updates, phones: [...updates.phones] };
        //updatedTicket.phones.push({ id: -1, type: "", number: "" });
    
        // this.storedTickets = this.storedTickets.map(t =>
        //   t.id === updatedTicket.id ? updatedTicket : t
        // );
    
        //return of(updatedTicket).pipe(delay(randomDelay()));
      }
    
      updatePhones(aIdPhones: {addressId: string, phones: Phone[]}[]): Observable<Phone[]> {
        let id = Math.max(...this.storedPhones.map(p=> p.id));
        let aIds = [];
        aIdPhones.forEach(ap => {
          aIds.push(ap.addressId)
          const newPhones = ap.phones.filter(p => p.id === null).map(p => ({...p, id: ++id}))
          const existingPhones = ap.phones.filter(p => p.id !== null)
          this.storedPhones = this.storedPhones.filter(p => p.addressId !== ap.addressId).concat(newPhones, existingPhones);
        })
        // const newPhones = phones.filter(p => p.id === null).map(p => ({...p, id: ++id}))
        // this.storedPhones = this.storedPhones.concat(newPhones);
        // const phones2 = phones.filter(p=> p.id!==null)
        // this.storedPhones = this.storedPhones.filter(p => !phones2.map(p=>p.id).includes(p.id) ).concat(phones2);
        //console.log(this.storedPhones)
        const phs = this.storedPhones.filter(p => aIds.includes(p.addressId));
        return of(phs).pipe(delay(randomDelay()));
      }
        
}