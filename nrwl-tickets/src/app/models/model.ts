import { EntityState } from "@ngrx/entity";

export interface User  {
    id: number;
    name: string;
  };
  
  export interface Ticket {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
    phones: Phone[];
  };
  
  export interface Phone {
    id: number;
    type: string;
    number: string;
  };
  