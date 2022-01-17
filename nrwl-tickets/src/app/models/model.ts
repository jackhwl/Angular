import { EntityState } from "@ngrx/entity";

export interface User  {
    id: number;
    name: string;
};
  

  export interface Address  {
    id: string;
    addr1: string;
    addr2: string;
    postcode: string;
  };

  interface TicketBase {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  };

  export interface Ticket extends TicketBase {
    phoneIds: number[];
    addressIds: string[];
  }  

  export interface Ticket_vm extends TicketBase {
    phones: Phone[];
    addresses: Address[];
  };
  
  export interface Phone {
    id: number;
    type: string;
    number: string;
  };
  