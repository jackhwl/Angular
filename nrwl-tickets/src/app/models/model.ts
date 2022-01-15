import { EntityState } from "@ngrx/entity";

export interface User  {
    id: number;
    name: string;
  };
  
  interface TicketBase {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  };
  export interface Ticket extends TicketBase {
    phones: EntityState<Phone>;
  }  
  export interface Ticket_vm extends TicketBase {
    phones: Phone[];
  };
  
  export interface Phone {
    id: number;
    type: string;
    number: string;
  };
  