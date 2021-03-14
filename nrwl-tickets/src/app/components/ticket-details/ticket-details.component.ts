import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ticket } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"]
})
export class TicketDetailsComponent {
  currentTicket: Ticket;
  @Input() set ticket(value: Ticket) {
    this.currentTicket = { ...value };
  }
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();

  resetForm(form) {
    form.reset();
    // form.controls.forEach((name, control) => {
    //   control.updateValue('');
    //   control.setErrors(null);
    // });
  }
}
