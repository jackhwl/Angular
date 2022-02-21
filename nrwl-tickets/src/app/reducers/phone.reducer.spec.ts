import { PhoneApiActions } from "../actions"
import { initialState, reducer } from "./phone.reducer"
import { Phone } from "../models/model";

it('PhoneActions.updatePhonesSuccess should set load to false ', () => {
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