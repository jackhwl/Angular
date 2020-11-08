import * as fromWeather from './weather.actions';

describe('loadWeathers', () => {
  it('should return an action', () => {
    expect(fromWeather.loadWeathers().type).toBe('[Weather] Load Weathers');
  });
});
