import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ticket, Ticket_vm } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
import { v4 as uuidv4 } from 'uuid';
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs";

@Injectable()
export class UtilService {
  constructor(private readonly fb: FormBuilder) {}
  
  generateTicketForm(ticket: Ticket_vm): FormGroup {
    //console.log('generateTicketForm', ticket)
    const ticketForm = this.fb.group({
      id: [ticket.id],
      assigneeId: [ticket.assigneeId, Validators.required],
      completed: [ticket.completed, Validators.required],
      description: [ticket.description, Validators.required],
      addresses: this.fb.array([]),
      title: [ticket.id === null ? "New Ticket" : "Edit Ticket"],
      assignees: [ticket.assignees]
    });
    Object.values(ticket.addresses).map(address => {
      //console.log('generateTicketForm inner= ', address)
      if (address) {
        let aFA = ticketForm.controls.addresses as FormArray;
        let addressForm = this.fb.group({
          id: [address.id],
          addr1: [address.addr1],
          addr2: [address.addr2],
          postcode: [address.postcode],
          ticketId: [address.ticketId],
          phones: this.fb.array([])
        })
        Object.values(address.phones).map(phone => {
          let pFa = addressForm.controls.phones as FormArray;
          let phoneForm = this.fb.group({
            id: [phone.id],
            type: [phone.type],
            number: [phone.number],
            addressId: [phone.addressId],
          })
          pFa.push(phoneForm)
        })
        aFA.push(addressForm)
      }
    })
    // Object.values(ticket.phones).map(phone => {
    //   console.log('generateTicketForm inner phone= ', phone)
    //   if (phone != null) {
    //     var pFA = ticketForm.controls.phones as FormArray;
    //     pFA.push(
    //       this.fb.group({
    //         id: [phone.id],
    //         type: [phone.type],
    //         number: [phone.number]
    //       })
    //     )
    //   }
    // })
  

    //console.log('generateTicketForm', ticketForm)

    return ticketForm;
  }

  generateTicketSearchForm(q: string): FormGroup {
    return this.fb.group({search: [q]})
  }

  getEmptyPhoneFG() {
    return this.fb.group({
      id: [uuidv4()],
      type: [],
      number: []
    })
  }

  getEmptyAddressFG() {
    return this.fb.group({
      id: [uuidv4()],
      addr1: [],
      addr2: [],
      postcode: [],
      phones: this.fb.array([])
    })
  }

}
