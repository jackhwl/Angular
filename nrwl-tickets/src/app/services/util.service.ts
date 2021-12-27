import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Ticket } from "./backend.service";

@Injectable()
export class UtilService {
  constructor(private readonly fb: FormBuilder) {}

  generateTicketForm(ticket: Ticket) {
    const ticketForm = this.fb.group({
      id: [ticket.id],
      assigneeId: [ticket.assigneeId, Validators.required],
      completed: [ticket.completed, Validators.required],
      description: [ticket.description, Validators.required],
      phones: this.fb.array(
        ticket.phones.map(phone =>
          this.fb.group({
            type: [phone.type],
            number: [phone.number]
          })
        )
      ),
      title: [ticket.id === null ? "New Ticket" : "Edit Ticket"]
    });

    return ticketForm;
  }
}
