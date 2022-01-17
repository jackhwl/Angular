import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getTicketModuleState, TicketModuleState } from ".";
import { Phone } from "../models/model";
import { phoneAdapter } from "./phones.reducer";
import { PhoneState } from "./phones.reducer";

export const getPhoneState = createSelector(
    getTicketModuleState,
    (state: TicketModuleState) => state.phones
);
  
const { selectEntities } = phoneAdapter.getSelectors();

export const getPhoneEntities = createSelector(
    getPhoneState,
    (state: PhoneState) => selectEntities(state)
  );
  
