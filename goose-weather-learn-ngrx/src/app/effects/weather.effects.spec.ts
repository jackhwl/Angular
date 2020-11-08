import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WeatherEffects } from './weather.effects';

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(WeatherEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
