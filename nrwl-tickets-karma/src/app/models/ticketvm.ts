import { Ticket, User } from "../services/backend.service";

export interface TicketVm extends Ticket {
  assignees: User[];
}
