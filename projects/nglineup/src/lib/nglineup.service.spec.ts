import { TestBed, inject } from '@angular/core/testing';

import { NglineupService } from './nglineup.service';

describe('NglineupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NglineupService]
    });
  });

  it('should be created', inject([NglineupService], (service: NglineupService) => {
    expect(service).toBeTruthy();
  }));
});
