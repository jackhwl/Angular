import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { PhonesActions, PhonesApiActions } from "../actions";
import { Phone } from "../models/model";

export const PHONES_FEATURE_KEY = "phones";

export interface PhoneState extends EntityState<Phone> {
  selectedId?: string | number; // which Phones record has been selected
  loaded: boolean; // has the Phones list been loaded
  error?: string | null; // last known error (if any)
}

export interface PhonesPartialState {
  readonly [PHONES_FEATURE_KEY]: PhoneState;
}

export const phoneAdapter: EntityAdapter<Phone> = createEntityAdapter<Phone>();

export const initialPhoneState: PhoneState = phoneAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

// const onFailure = (state, { error }) => ({ ...state, error });

export const phonesReducer = createReducer(
  initialPhoneState,
  on(PhonesActions.selectPhoneById, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  //   on(PhonesActions.selectPhone, (state, { phone }) =>
  //     Object.assign({}, state, { selectedId: phone?.id })
  //   ),
  // on(PhonesActions.resetPhones, (state) => widgetsAdapter.removeAll(state)),

  // Load widgets
  on(PhonesActions.loadPhones, state => {
    console.log('ccc');
    return ({
    ...state,
    loaded: false,
    error: null
  })}),
  on(PhonesApiActions.loadPhonesSuccess, (state, { phones }) => {
    console.log('reducer phones=', phones);
    return phoneAdapter.setAll(phones, { ...state, loaded: true, error: null })
  }
  ),
  on(PhonesApiActions.loadPhonesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// export function phonesReducer(state: PhoneState | undefined, action: Action) {
//   return _phonesReducer(state, action);
// }
