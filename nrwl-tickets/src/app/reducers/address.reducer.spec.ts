import { AddressApiActions } from "../actions"
import { initialState, reducer } from "./address.reducer"
import { Address } from "../models/model";

it('AddressApiActions.updateAddressesSuccess should set load to true ', () => {
    const addresses: Address[] = [
        {
            id: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e",
            addr1: "111",
            addr2: "11",
            countryId: "c1",
            cityId: "ct1",
            postcode: "M1W2G2",
            ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
            phoneIds: [],
          },
          {
              id: "d0dca54d-925e-4083-a52c-77c8a70d6628",
              addr1: "222111",
              addr2: "22",
              countryId: "c1",
              cityId: "ct1",
              postcode: "M2W3G3",
              ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
              phoneIds: [],
            }
    ];
    const newState = {
        ids: ['8410bd6e-7edb-4ba2-a6f4-1147cb442a0e', 'd0dca54d-925e-4083-a52c-77c8a70d6628'],
        entities: {
            '8410bd6e-7edb-4ba2-a6f4-1147cb442a0e': addresses[0],
            'd0dca54d-925e-4083-a52c-77c8a70d6628': addresses[1]
        },
        loaded: true, 
        error: null
    }
    expect(reducer(initialState, AddressApiActions.updateAddressesSuccess({addresses}))).toEqual(newState)
})

it('AddressApiActions.updateAddressesFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, AddressApiActions.updateAddressesFailure({error}))).toEqual(newState)
})

it('AddressApiActions.deleteTicketAddressesSuccess should set load to true ', () => {
    const ids: string[] = ['8410bd6e-7edb-4ba2-a6f4-1147cb442a0e', '78ffe723-5a31-429f-b50a-eca5515ecb8f'];
    const addresses: Address[] = [
        {
            id: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e",
            addr1: "111",
            addr2: "11",
            countryId: "c1",
            cityId: "ct1",
            postcode: "M1W2G2",
            ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
            phoneIds: [],
          },
          {
              id: "d0dca54d-925e-4083-a52c-77c8a70d6628",
              addr1: "222111",
              addr2: "22",
              countryId: "c1",
              cityId: "ct1",
              postcode: "M2W3G3",
              ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
              phoneIds: [],
            },
            {
              id: "92460e88-119f-482a-9761-1ec3f97bf7d2",
              addr1: "333",
              addr2: "33",
              countryId: "c1",
              cityId: "ct1",
              postcode: "",
              ticketId: '774c5999-5031-402d-bd4c-588d933dda20',
              phoneIds: []
            },
            {
                id: "78ffe723-5a31-429f-b50a-eca5515ecb8f",
                addr1: "444111",
                addr2: "44",
                countryId: "c1",
                cityId: "ct1",
                postcode: "",
                ticketId: '774c5999-5031-402d-bd4c-588d933dda20',
                phoneIds: []
              }
    ];
    const newState = {
        ids: ['d0dca54d-925e-4083-a52c-77c8a70d6628', '92460e88-119f-482a-9761-1ec3f97bf7d2'],
        entities: {
            'd0dca54d-925e-4083-a52c-77c8a70d6628': addresses[1],
            '92460e88-119f-482a-9761-1ec3f97bf7d2': addresses[2]
        },
        loaded: true, 
        error: null
    }
    const prevState = reducer(initialState, AddressApiActions.updateAddressesSuccess({addresses}))
    expect(reducer(prevState, AddressApiActions.deleteTicketAddressesSuccess({ids}))).toEqual(newState)
})

it('AddressApiActions.deleteTicketAddressesFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, AddressApiActions.deleteTicketAddressesFailure({error}))).toEqual(newState)
})

it('AddressApiActions.loadAddressesOfTicketSuccess should set load to true ', () => {
    const addresses: Address[] = [
        {
            id: "8410bd6e-7edb-4ba2-a6f4-1147cb442a0e",
            addr1: "111",
            addr2: "11",
            countryId: "c1",
            cityId: "ct1",
            postcode: "M1W2G2",
            ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
            phoneIds: [],
          },
          {
              id: "d0dca54d-925e-4083-a52c-77c8a70d6628",
              addr1: "222111",
              addr2: "22",
              countryId: "c1",
              cityId: "ct1",
              postcode: "M2W3G3",
              ticketId: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
              phoneIds: [],
            }
    ];
    const newState = {
        ids: ['8410bd6e-7edb-4ba2-a6f4-1147cb442a0e', 'd0dca54d-925e-4083-a52c-77c8a70d6628'],
        entities: {
            '8410bd6e-7edb-4ba2-a6f4-1147cb442a0e': addresses[0],
            'd0dca54d-925e-4083-a52c-77c8a70d6628': addresses[1]
        },
        loaded: true, 
        error: null
    }
    expect(reducer(initialState, AddressApiActions.loadAddressesOfTicketSuccess({addresses}))).toEqual(newState)
})

it('AddressApiActions.loadAddressesOfTicketFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, AddressApiActions.loadAddressesOfTicketFailure({error}))).toEqual(newState)
})
