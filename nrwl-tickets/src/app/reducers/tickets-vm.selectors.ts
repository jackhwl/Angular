import { createSelector } from "@ngrx/store";
import { Phone, Ticket_vm } from "../models/model";
import { getAllPhones } from "./phones.selectors";
import { getSelected as getSelectedTicket, getSelectedByRoute as getSelectedTicketByRoute } from "./tickets.selectors";

export const getPhonesOfTicket = createSelector(
    getSelectedTicket,
    getAllPhones,
    (ticket, phones): Phone[] => {
      //console.log('getSelected ticket=', ticket);
      //console.log('phones=', phones);
      return ticket ? ticket.phoneIds.filter(id => phones.map(p=> p.id).includes(id)).map(pId => phones[pId]) : [] }
  );
  
  export const getSelectedTicketVmByRoute = createSelector(
    getSelectedTicketByRoute,
    getPhonesOfTicket,
    (ticket, phones): Ticket_vm => {
      console.log('ticket=', ticket);
      console.log('phones=', phones);
      return ticket && {
      id: ticket.id,
      description: ticket.description,
      assigneeId: ticket.assigneeId,
      completed: ticket.completed,
      phones,
      addresses: []
    }
  }
  );
  