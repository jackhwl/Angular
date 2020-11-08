import * as fromLocation from './location.actions';

describe('loadLocations', () => {
  it('should return an action', () => {
    expect(fromLocation.loadLocations().type).toBe('[Location] Load Locations');
  });
});
