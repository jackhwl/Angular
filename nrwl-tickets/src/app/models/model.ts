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
    type: string;
    number: string;
  };
  