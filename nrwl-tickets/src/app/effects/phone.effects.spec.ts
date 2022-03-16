import { ActionsSubject, Action } from '@ngrx/store';
import { PhoneEffects } from './phone.effects';
import { PhoneService } from '../services/phone.service';
import { PhoneApiActions, PhoneActions } from '../actions';
import { Phone } from '../models/model';
import { Observable, of } from "rxjs";
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { subscribeSpyTo, fakeTime } from '@hirez_io/observer-spy';

afterEach(() => {
    // don't forget to reset the timers
    jest.useRealTimers();
});

it('load phones of address dispatches a success action', () => {
    const { service } = setup();
    const actions = new ActionsSubject();
    const effects = new PhoneEffects(actions, service);

    const result: Action[] = []
    effects.loadPhonesOfAddress$.subscribe(action => result.push(action));

    const action = PhoneActions.loadPhonesOfAddress({addressIds: ['a']})
    actions.next(action)

    expect(result).toEqual([PhoneApiActions.loadPhonesOfAddressSuccess({ phones: newPhones() })])
})

it('load phones of address dispatches a success action (using observe-spy)', fakeTime( flush => {
    const { service } = setup();
    const actions = new ActionsSubject();
    const effects = new PhoneEffects(actions, service);

    const observerSpy = subscribeSpyTo(effects.loadPhonesOfAddress$)

    const action = PhoneActions.loadPhonesOfAddress({addressIds: ['a']})
    actions.next(action)
    flush()

    expect(observerSpy.getValues()).toEqual([PhoneApiActions.loadPhonesOfAddressSuccess({ phones: newPhones() })])
}))

it('update phones of address dispatches a success action (using jest)', () => {
    jest.useFakeTimers()

    const { service } = setup();
    const actions = new ActionsSubject();
    const effects = new PhoneEffects(actions, service);

    const result: Action[] = []
    effects.updatePhones$.subscribe(action => result.push(action))

    const action = PhoneActions.updatePhones({aIdPhones: [{addressId: 'a', phones: newPhones() }]})
    actions.next(action)

    jest.advanceTimersByTime(10_000)
    jest.runOnlyPendingTimers()

    expect(result).toEqual([PhoneApiActions.updatePhonesSuccess({ phones: newPhones() })])
})

it('delete phones of address dispatches a success action (using observe-spy)', fakeTime( flush => {
    const { service } = setup();
    const actions = new ActionsSubject();
    const effects = new PhoneEffects(actions, service);

    const observerSpy = subscribeSpyTo(effects.deleteAddressesPhones$)

    const action = PhoneActions.deleteAddressesPhones({addressIds: ['a']})
    actions.next(action)
    flush()

    expect(observerSpy.getValues()).toEqual([PhoneApiActions.deleteAddressesPhonesSuccess({ ids: [''] })])
}))

function setup() {
    const service = createMockWithValues(PhoneService, {
        phones: () => of(newPhones()),
        updatePhones: () => of(newPhones()),
        deleteAddressesPhones: () => of([''])
    });

    return {service}
}

function newPhones(): Phone[] {
    return  [
        { id: 'fd24e10a-20b6-4da1-8649-88ad51fd0a59', type: "home", number: "111", addressId: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e" },
        { id: '0a7d7600-29c6-4c2c-979b-9d1a553f6863', type: "mobile", number: "222", addressId: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e" },
    ];
}