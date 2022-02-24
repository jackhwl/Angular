import { PhoneApiActions } from "../actions"
import { initialState, reducer } from "./phone.reducer"
import { Phone } from "../models/model";

it('PhoneApiActions.updatePhonesSuccess should set load to true ', () => {
    const phones: Phone[] = [
        { id: '2', type: "mobile", number: "222", addressId: "a1" },
        { id: '3', type: "home", number: "333", addressId: "a2" },
    ];
    const newState = {
        ids: ['2', '3'],
        entities: {
            '2': phones[0],
            '3': phones[1]
        },
        loaded: true
    }
    expect(reducer(initialState, PhoneApiActions.updatePhonesSuccess({phones}))).toEqual(newState)
})

it('PhoneApiActions.updatePhonesFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, PhoneApiActions.updatePhonesFailure({error}))).toEqual(newState)
})

it('PhoneApiActions.deleteAddressesPhonesSuccess should set load to true ', () => {
    const ids: string[] = ['1', '4'];
    const phones: Phone[] = [
        { id: '1', type: "mobile", number: "111", addressId: "a1" },
        { id: '2', type: "mobile", number: "222", addressId: "a1" },
        { id: '3', type: "home", number: "333", addressId: "a2" },
        { id: '4', type: "home", number: "444", addressId: "a2" },
    ];
    const newState = {
        ids: ['2', '3'],
        entities: {
            '2': phones[1],
            '3': phones[2]
        },
        loaded: true
    }
    const prevState = reducer(initialState, PhoneApiActions.updatePhonesSuccess({phones}))
    expect(reducer(prevState, PhoneApiActions.deleteAddressesPhonesSuccess({ids}))).toEqual(newState)
})

it('PhoneApiActions.deleteAddressesPhonesFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, PhoneApiActions.deleteAddressesPhonesFailure({error}))).toEqual(newState)
})

it('PhoneApiActions.loadPhonesOfAddressSuccess should set load to true ', () => {
    const phones: Phone[] = [
        { id: '2', type: "mobile", number: "222", addressId: "a1" },
        { id: '3', type: "home", number: "333", addressId: "a2" },
    ];
    const newState = {
        ids: ['2', '3'],
        entities: {
            '2': phones[0],
            '3': phones[1]
        },
        loaded: true, 
        error: null
    }
    expect(reducer(initialState, PhoneApiActions.loadPhonesOfAddressSuccess({phones}))).toEqual(newState)
})

it('PhoneApiActions.loadPhonesOfAddressFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, PhoneApiActions.loadPhonesOfAddressFailure({error}))).toEqual(newState)
})
