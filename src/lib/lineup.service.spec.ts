import { TestBed, inject } from '@angular/core/testing';

import { LineUpService } from './lineup.service';

describe('LineUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineUpService]
    });
  });

  it('should be created', inject([LineUpService], (service: LineUpService) => {
    expect(service).toBeTruthy();
  }));
});
