import { createSelector } from "@ngrx/store";
import { Address, Phone, Ticket_vm } from "../models/model";
import { getPhoneEntities } from "./phone.selectors";
import { getAddressEntities } from "./address.selectors";
import { getSelected as getSelectedTicket, getSelectedByRoute as getSelectedTicketByRoute } from "./ticket.selectors";

// export const getPhonesOfTicket = createSelector(
//     getSelectedTicket,
//     getPhoneEntities,
//     (ticket, phoneEntities): Phone[] => {
//       //console.log('getSelected ticket=', ticket);
//       //console.log('phones=', phoneEntities);
//       return ticket ? ticket.phoneIds.filter(id => Object.keys(phoneEntities).includes(id.toString())).map(pId => phoneEntities[pId]) : [] }
// );

export const getAddressesOfTicket = createSelector(
  getSelectedTicket,
  getAddressEntities,
  (ticket, addressEntities): Address[] => {
    //console.log('getSelected ticket=', ticket);
    //console.log('address=', addressEntities);
    return Object.keys(addressEntities).filter(id => ticket.addressIds.includes(id)).map(id => addressEntities[id]) }
    //return ticket && Object.keys(addressEntities) ? ticket.addressIds.map(id => addressEntities[id]) : [] }
)
  
  export const getSelectedTicketVmByRoute = createSelector(
    getSelectedTicketByRoute,
    getAddressesOfTicket,
    (ticket, addresses): Ticket_vm => {
      // console.log('ticket=', ticket);
      // console.log('addresses=', addresses);
      return ticket && {
      id: ticket.id,
      description: ticket.description,
      assigneeId: ticket.assigneeId,
      completed: ticket.completed,
      addresses
    }
  }
  );
  