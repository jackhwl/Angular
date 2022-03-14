import { ActionsSubject, Action } from '@ngrx/store';
import { PhoneEffects } from './phone.effects';
import { PhoneService } from '../services/phone.service';
import { PhoneApiActions, PhoneActions } from '../actions';
import { Phone } from '../models/model';
import { Observable, of } from "rxjs";

it('load phones of address dispatches a success action', () => {
    const actions = new ActionsSubject();
    const effects = new PhoneEffects(actions, newPhoneService());
})

function newPhones(addressIds): Phone[] {
    return  [
        { id: 'fd24e10a-20b6-4da1-8649-88ad51fd0a59', type: "home", number: "111", addressId: addressIds[0] },
        { id: '0a7d7600-29c6-4c2c-979b-9d1a553f6863', type: "mobile", number: "222", addressId: addressIds[0] },
    ];
}

function newPhoneService(): PhoneService {
    return {
        phones: (addressIds: string[]) => {
            return of(newPhones(addressIds));
        },
    };
}