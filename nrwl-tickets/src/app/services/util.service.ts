import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Ticket, Ticket_vm } from "../models/model";
import { initialPhoneState, phoneAdapter } from "../reducers/tickets.reducer";

@Injectable()
export class UtilService {
  constructor(private readonly fb: FormBuilder) {}

  generateTicketForm(ticket: Ticket) {
    //console.log('generateTicketForm', ticket)
    const ticketForm = this.fb.group({
      id: [ticket.id],
      assigneeId: [ticket.assigneeId, Validators.required],
      completed: [ticket.completed, Validators.required],
      description: [ticket.description, Validators.required],
      phones: this.fb.array(
        Object.values(ticket.phones.entities??[]).map(phone =>
          this.fb.group({
            id: [phone.id],
            type: [phone.type],
            number: [phone.number]
          })
        )
      ),
      title: [ticket.id === null ? "New Ticket" : "Edit Ticket"]
    });

    //console.log('generateTicketForm', ticketForm)

    return ticketForm;
  }

  getTicketFromVm(ticket_vm: Ticket_vm): Ticket {
    return {
      id: ticket_vm.id,
      description: ticket_vm.description,
      assigneeId: ticket_vm.assigneeId,
      completed: ticket_vm.completed,
      phones: phoneAdapter.setAll(ticket_vm.phones, initialPhoneState)
    };
  }
}
