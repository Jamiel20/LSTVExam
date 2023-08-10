import { TestBed } from '@angular/core/testing';

import { LSTVServiceService } from './lstvservice.service';

describe('LSTVServiceService', () => {
  let service: LSTVServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LSTVServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
