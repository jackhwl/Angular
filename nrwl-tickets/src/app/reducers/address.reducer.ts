import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { AddressActions, AddressApiActions } from "../actions";
import { Address } from "../models/model";
import { tap } from "rxjs/operators";
import { immerOn } from 'ngrx-immer/store';
import produce from "immer";

export const addressesFeatureKey = "addresses";

export interface State extends EntityState<Address> {
  loaded: boolean; // has the Addresss list been loaded
  error?: string | null; // last known error (if any)
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>();

export const initialState: State = adapter.getInitialState({
  // set initial required properties
  loaded: false
});

export const reducer = createReducer(
  initialState,
//   on(AddressActions.loadAddressesOfTicket, (state, { selectedId }) =>
//     Object.assign({}, state, { selectedId })
//   ),
  //   on(AddressActions.selectAddress, (state, { address }) =>
  //     Object.assign({}, state, { selectedId: address?.id })
  //   ),
  // on(AddressActions.resetAddresss, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(AddressApiActions.loadAddressesOfTicketSuccess, (state, { addresses }) => {
    //console.log('reducer addresses=', addresses);
    return adapter.setAll(addresses, produce(state, draft => {draft.loaded = true, draft.error = null }))
  }),
  immerOn(AddressApiActions.loadAddressesOfTicketFailure, (state, { error }) => {
    state.error = error
  }),
  on(AddressApiActions.updateAddressesSuccess, (state, { addresses }) => {
    return adapter.setAll(addresses, produce(state, draft => {draft.loaded = true, draft.error = null }))
  }), 
  immerOn(AddressApiActions.updateAddressesFailure, (state, { error }) => {
    state.error = error
  }),  
  on(AddressApiActions.deleteTicketAddressesSuccess, (state, { ids }) => {
    //console.log(addresses);
    return adapter.removeMany(ids, produce(state, draft => {draft.loaded = true }))
  }),   
  immerOn(AddressApiActions.deleteTicketAddressesFailure, (state, { error }) => {
    state.error = error
  }),   
  // on(AddressApiActions.addNewPhonesSuccess, (state, { addresses }) => 
  //   adapter.updateMany(addresses, {...state, loaded: true})
  // ), 
);

// export function addressesReducer(state: AddressState | undefined, action: Action) {
//   return _addressesReducer(state, action);
// }
