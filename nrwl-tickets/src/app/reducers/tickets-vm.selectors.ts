import { createSelector } from "@ngrx/store";
import { Phone, Ticket_vm } from "../models/model";
import { getPhoneEntities } from "./phones.selectors";
import { getSelected as getSelectedTicket, getSelectedByRoute as getSelectedTicketByRoute } from "./tickets.selectors";

export const getPhonesOfTicket = createSelector(
    getSelectedTicket,
    getPhoneEntities,
    (ticket, phoneEntities): Phone[] => {
      //console.log('getSelected ticket=', ticket);
      //console.log('phones=', phoneEntities);
      return ticket ? ticket.phoneIds.filter(id => Object.keys(phoneEntities).includes(id.toString())).map(pId => phoneEntities[pId]) : [] }
  );
  
  export const getSelectedTicketVmByRoute = createSelector(
    getSelectedTicketByRoute,
    getPhonesOfTicket,
    (ticket, phones): Ticket_vm => {
      //console.log('ticket=', ticket);
      //console.log('phones=', phones);
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
  