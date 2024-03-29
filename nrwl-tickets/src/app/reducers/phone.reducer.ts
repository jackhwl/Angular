import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { PhoneApiActions } from "../actions";
import { Phone } from "../models/model";

import { immerOn } from 'ngrx-immer/store';
import produce from "immer";

export const PHONES_FEATURE_KEY = "phones";

export interface State extends EntityState<Phone> {
  selectedId?: string | number; // which Phones record has been selected
  loaded: boolean; // has the Phones list been loaded
  error?: string | null; // last known error (if any)
}


export const adapter: EntityAdapter<Phone> = createEntityAdapter<Phone>();

export const initialState: State = adapter.getInitialState({
  // set initial required properties
  loaded: false
});

// const onFailure = (state, { error }) => ({ ...state, error });

export const reducer = createReducer(
  initialState,

  // on(PhoneApiActions.updatePhonesSuccess, (state, { phones }) => 
  //     adapter.setAll(phones, {...state, loaded: true})
  // ), 
  on(PhoneApiActions.updatePhonesSuccess, (state, { phones }) => 
    adapter.setAll(phones, produce(state, draft => { draft.loaded = true}))
  ), 
  // on(PhoneApiActions.updatePhonesFailure, (state, { error }) => ({
  //   ...state,
  //   error
  // })), 
  immerOn(PhoneApiActions.updatePhonesFailure, (state, { error }) => {
    state.error = error
  }), 

  on(PhoneApiActions.deleteAddressesPhonesSuccess, (state, { ids }) => {
    return adapter.removeMany(ids, {...state, loaded: true})
  }),   
  immerOn(PhoneApiActions.deleteAddressesPhonesFailure, (state, { error }) => {
    state.error = error
  }), 
  
  // on(PhoneApiActions.loadPhonesOfAddressSuccess, (state, { phones }) => {
  //   return adapter.setAll(phones, { ...state, loaded: true, error: null })
  // }),
  on(PhoneApiActions.loadPhonesOfAddressSuccess, (state, { phones }) => {
    return adapter.setAll(phones, produce(state, draft => {
      draft.loaded = true;
      draft.error = null;
    }))
  }),
  on(PhoneApiActions.loadPhonesOfAddressFailure, (state, { error }) => ({
    ...state,
    error
  })),
    // on(PhoneActions.selectPhoneById, (state, { selectedId }) =>
  //   Object.assign({}, state, { selectedId })
  // ),
  //   on(PhoneActions.selectPhone, (state, { phone }) =>
  //     Object.assign({}, state, { selectedId: phone?.id })
  //   ),
  // on(PhoneActions.resetPhones, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
);

// export function phonesReducer(state: PhoneState | undefined, action: Action) {
//   return _phonesReducer(state, action);
// }
