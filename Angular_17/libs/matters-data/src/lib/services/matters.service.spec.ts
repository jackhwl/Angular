import { TestBed } from '@angular/core/testing';

import { MattersService } from './matters.service';

describe('MattersService', () => {
  let service: MattersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MattersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
