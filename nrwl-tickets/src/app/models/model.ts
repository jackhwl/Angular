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
    countryId?: string;
    cityId?: string;
    ticketId: string;
  };

  export interface Address extends AddressBase {
    phoneIds: string[];
  };

  export interface Address_vm extends AddressBase {
    phones?: Phone[];
  };
  
  export interface TicketBase {
    id: string;
    description: string;
    assigneeId: number;
    completed: boolean;
  };

  export interface Ticket extends TicketBase {
    addressIds: string[];
  }  

  export interface Ticket_vm extends TicketBase {
    addresses: Address_vm[];
    assignees: User[];
    title?: string;
  };
  
  export interface Phone {
    id: string;
    type: string;
    number: string;
    addressId: string;
  };
  