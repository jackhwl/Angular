import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ticket, Ticket_vm } from "../models/model";
import { initialPhoneState, phoneAdapter } from "../reducers/phones.reducer";

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
      phones: this.fb.array([]),
      title: [ticket.id === null ? "New Ticket" : "Edit Ticket"]
    });
    Object.values(ticket.phones).map(phone => {
      //console.log('generateTicketForm inner= ', phone)
      if (phone != null) {
        var pFA = ticketForm.get('phones') as FormArray;
        pFA.push(
          this.fb.group({
            id: [phone.id],
            type: [phone.type],
            number: [phone.number]
          }))
    }}
    )
  

    //console.log('generateTicketForm', ticketForm)

    return ticketForm;
  }

  getTicketFromVm(ticket_vm: Ticket_vm): Ticket {
    return {
      id: ticket_vm.id,
      description: ticket_vm.description,
      assigneeId: ticket_vm.assigneeId,
      completed: ticket_vm.completed,
      phoneIds: ticket_vm.phones.map(p => p.id),
      addressIds: []//ticket_vm.addresses.map(a => a.id)
    };
  }
}
