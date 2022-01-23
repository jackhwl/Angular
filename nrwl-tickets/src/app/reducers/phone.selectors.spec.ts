import {
    getPhoneEntities

} from "./phone.selectors";

describe("Phones Selectors", () => {
    const initialState = {
      phones: {
        ids: [0, 2],
        entities: {
          0: {
            id: 0, type: "home", number: "111" 
          },
          2: {
            id: 2, type: "mobile", number: "222"
          }
        },
        error: null,
        loaded: false,
        selectedId: null
      }
    };
    const initialTicketModuleState = {
      tickets: {},
      phoness: initialState.phones
    };
  
    it("should return phone entities", () => {
      const result = getPhoneEntities.projector(initialState.phones);
      expect(result).toBe(initialState.phones.entities);
    });
  });
  