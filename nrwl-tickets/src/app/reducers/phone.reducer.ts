import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { PhoneActions, PhoneApiActions } from "../actions";
import { Phone } from "../models/model";

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
  on(PhoneActions.selectPhoneById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  //   on(PhoneActions.selectPhone, (state, { phone }) =>
  //     Object.assign({}, state, { selectedId: phone?.id })
  //   ),
  // on(PhoneActions.resetPhones, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(PhoneActions.loadPhonesOfAddress, state => {
    //console.log('ccc');
    return ({
    ...state,
    loaded: false,
    error: null
  })}),
  on(PhoneApiActions.updatePhonesSuccess, (state, { phones }) => 
      adapter.setAll(phones, {...state, loaded: true})
  ), 
  on(PhoneApiActions.updatePhonesFailure, (state, { error }) => ({
    ...state,
    error
  })), 
  on(PhoneApiActions.loadPhonesOfAddressSuccess, (state, { phones }) => {
    //console.log('reducer phones=', phones);
    return adapter.setAll(phones, { ...state, loaded: true, error: null })
  }
  ),
  on(PhoneApiActions.loadPhonesOfAddressFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// export function phonesReducer(state: PhoneState | undefined, action: Action) {
//   return _phonesReducer(state, action);
// }
