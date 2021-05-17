import { TestBed } from '@angular/core/testing';

import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

describe('CrisisDetailResolverService', () => {
  let service: CrisisDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrisisDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
