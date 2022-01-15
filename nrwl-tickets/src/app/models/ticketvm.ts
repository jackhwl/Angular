import { Ticket, User } from "./model";

export interface TicketVm extends Ticket {
  assignees: User[];
}
