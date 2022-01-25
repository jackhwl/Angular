import { createSelector } from "@ngrx/store";
import { Address, Phone, Ticket_vm } from "../models/model";
import { getPhoneEntities } from "./phone.selectors";
import { getAddressEntities } from "./address.selectors";
import { getSelected as getSelectedTicket, getSelectedByRoute as getSelectedTicketByRoute } from "./ticket.selectors";

export const getPhonesOfTicket = createSelector(
    getSelectedTicket,
    getPhoneEntities,
    (ticket, phoneEntities): Phone[] => {
      //console.log('getSelected ticket=', ticket);
      //console.log('phones=', phoneEntities);
      return ticket ? ticket.phoneIds.filter(id => Object.keys(phoneEntities).includes(id.toString())).map(pId => phoneEntities[pId]) : [] }
);

export const getAddressesOfTicket = createSelector(
  getSelectedTicket,
  getAddressEntities,
  (ticket, addressEntities): Address[] => {
    //console.log('getSelected ticket=', ticket);
    //console.log('address=', addressEntities);
    return ticket ? ticket.addressIds.map(id => addressEntities[id]) : [] }
);
  
  export const getSelectedTicketVmByRoute = createSelector(
    getSelectedTicketByRoute,
    getAddressesOfTicket,
    getPhonesOfTicket,
    (ticket, addresses, phones): Ticket_vm => {
      // console.log('ticket=', ticket);
      // console.log('addresses=', addresses);
      // console.log('phones=', phones);
      return ticket && {
      id: ticket.id,
      description: ticket.description,
      assigneeId: ticket.assigneeId,
      completed: ticket.completed,
      phones,
      addresses
    }
  }
  );
  