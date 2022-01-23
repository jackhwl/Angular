import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { AddressActions, AddressApiActions } from "../actions";
import { Address } from "../models/model";

export const ADDRESSES_FEATURE_KEY = "addresses";

export interface AddressState extends EntityState<Address> {
  loaded: boolean; // has the Addresss list been loaded
  error?: string | null; // last known error (if any)
}

export interface AddresssPartialState {
  readonly [ADDRESSES_FEATURE_KEY]: AddressState;
}

export const addressAdapter: EntityAdapter<Address> = createEntityAdapter<Address>();

export const initialAddressState: AddressState = addressAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

// const onFailure = (state, { error }) => ({ ...state, error });

export const reducer = createReducer(
  initialAddressState,
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
    return addressAdapter.setAll(addresses, { ...state, loaded: true, error: null })
  }
  ),
  on(AddressApiActions.loadAddressesOfTicketFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// export function addressesReducer(state: AddressState | undefined, action: Action) {
//   return _addressesReducer(state, action);
// }
