
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Phone } from "../models/model";
import { ErrorService } from "./error.service";

function randomDelay() {
return Math.random() * 1000;
}

@Injectable()
export class PhoneService {

    constructor(private errorService: ErrorService) {}

    storedPhones: Phone[] = [
        { id: 'fd24e10a-20b6-4da1-8649-88ad51fd0a59', type: "home", number: "111", addressId: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e" },
        { id: '0a7d7600-29c6-4c2c-979b-9d1a553f6863', type: "mobile", number: "222", addressId: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e" },
        { id: 'cc716508-7eeb-4e84-8987-2cff0b423606', type: "home", number: "333", addressId: "d0dca54d-925e-4083-a52c-77c8a70d6628" },
        { id: 'c13e7500-3a28-43ff-823a-f5ae1f590882', type: "mobile", number: "444", addressId: "d0dca54d-925e-4083-a52c-77c8a70d6628" }
    ];

    phones(addressIds: string[]) {
        return of(this.storedPhones.filter(p => addressIds.includes(p.addressId))).pipe(delay(randomDelay()));
    }

    updatePhones(aIdPhones: {addressId: string, phones: Phone[]}[]): Observable<Phone[]> {
      // let id = uuidv4();
      let aIds = [];
      aIdPhones.forEach(ap => {
        aIds.push(ap.addressId)
        // const newPhones = ap.phones.filter(p => p.id === null).map(p => ({...p, id}))
        // const existingPhones = ap.phones.filter(p => p.id !== null)
        this.storedPhones = this.storedPhones.filter(p => p.addressId !== ap.addressId).concat(ap.phones) //(newPhones, existingPhones);
      })
      // const newPhones = phones.filter(p => p.id === null).map(p => ({...p, id: ++id}))
      // this.storedPhones = this.storedPhones.concat(newPhones);
      // const phones2 = phones.filter(p=> p.id!==null)
      // this.storedPhones = this.storedPhones.filter(p => !phones2.map(p=>p.id).includes(p.id) ).concat(phones2);
      //console.log(this.storedPhones)
      const phs = this.storedPhones.filter(p => aIds.includes(p.addressId));
      return of(phs).pipe(delay(randomDelay()));
    }

    deleteAddressesPhones(addressIds: string[]): Observable<string[]> {
      const ids = this.storedPhones.filter(a => addressIds.includes(a.addressId)).map(a => a.id)
      this.storedPhones = this.storedPhones.filter(a => !addressIds.includes(a.addressId));
      return of(ids).pipe(delay(randomDelay()));        
    }

    // addPhone(): Observable<Phone> {
    //     let id = uuidv4();
    //     const newPhone: Phone = { id, type: "", number: "", addressId: "" }
    //     this.storedPhones = this.storedPhones.concat(newPhone);
    //     return of(newPhone).pipe(delay(randomDelay()));
    //     //const updatedTicket = { ...updates, phones: [...updates.phones] };
    //     //updatedTicket.phones.push({ id: -1, type: "", number: "" });
    
    //     // this.storedTickets = this.storedTickets.map(t =>
    //     //   t.id === updatedTicket.id ? updatedTicket : t
    //     // );
    
    //     //return of(updatedTicket).pipe(delay(randomDelay()));
    //   }
    
      // deletePhone(id: string): Observable<Boolean> {
      //   this.storedPhones = this.storedPhones.filter(p => p.id !== id);
      //   return of(true).pipe(delay(randomDelay()));
      //   //const updatedTicket = { ...updates, phones: [...updates.phones] };
      //   //updatedTicket.phones.push({ id: -1, type: "", number: "" });
    
      //   // this.storedTickets = this.storedTickets.map(t =>
      //   //   t.id === updatedTicket.id ? updatedTicket : t
      //   // );
    
      //   //return of(updatedTicket).pipe(delay(randomDelay()));
      // }
            
}