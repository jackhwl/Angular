import { EntityState } from "@ngrx/entity";

export interface User  {
    id: number;
    name: string;
};
  

  interface AddressBase  {
    id: string;
    addr1: string;
    addr2: string;
    postcode: string;
    countryId: string;
    cityId: string;
    ticketId: number;
  };

  export interface Address extends AddressBase {
    phoneIds: number[];
  };

  export interface Address_vm extends AddressBase {
    phones: Phone[];
  };
  
  interface TicketBase {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  };

  export interface Ticket extends TicketBase {
    addressIds: string[];
  }  

  export interface Ticket_vm extends TicketBase {
    addresses: Address[];
  };
  
  export interface Phone {
    id: number;
    type: string;
    number: string;
  };
  