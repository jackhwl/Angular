import { createSelector } from "@ngrx/store";
import { Address, Phone, Ticket_vm } from "../models/model";
import { getAllPhones, getPhoneEntities } from "./phone.selectors";
import { getAddressEntities } from "./address.selectors";
import { getSelected as getSelectedTicket, getSelectedByRoute as getSelectedTicketByRoute } from "./ticket.selectors";

export const getAddressesOfTicket = createSelector(
  getSelectedTicket,
  getAddressEntities,
  (ticket, addressEntities): Address[] => {
    //console.log('getSelected ticket=', ticket);
    //console.log('address=', addressEntities);
    return Object.keys(addressEntities).filter(id => ticket.addressIds.includes(id)).map(id => addressEntities[id]) }
    //return ticket && Object.keys(addressEntities) ? ticket.addressIds.map(id => addressEntities[id]) : [] }
)
  
// export const getPhonesOfAddress = createSelector(
//   getAddressesOfTicket,
//   getPhoneEntities,
//   (addresses, phoneEntities): Phone[] => {
//     //console.log('addresses=', addresses);
//     console.log('phoneEntities=', phoneEntities);
//     console.log('test', Object.keys(phoneEntities))//.filter(id => [].concat(...addresses.map(a => a.phoneIds)).includes(id)))
//     return Object.keys(phoneEntities).filter(id => [].concat(...addresses.map(a => a.phoneIds)).includes(id)).map(pId => phoneEntities[pId]) 
//   }
// );

export const getSelectedTicketVmByRoute = createSelector(
    getSelectedTicketByRoute,
    getAddressesOfTicket,
    getAllPhones,
    (ticket, addresses, phones): Ticket_vm => {
      // console.log('ticket=', ticket);
      // console.log('addresses=', addresses);
      //console.log('phones=', phones);
      return ticket && {
        id: ticket.id,
        description: ticket.description,
        assigneeId: ticket.assigneeId,
        completed: ticket.completed,
        addresses: addresses.map(address => ({ ...address, phones: phones.filter(p => address.phoneIds.includes(p.id))}))
      }
    }
  );
  