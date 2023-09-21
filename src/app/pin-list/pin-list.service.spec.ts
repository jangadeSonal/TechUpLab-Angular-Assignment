import { TestBed } from '@angular/core/testing';

import { PinListService } from './pin-list.service';

describe('PinListService', () => {
  let service: PinListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
