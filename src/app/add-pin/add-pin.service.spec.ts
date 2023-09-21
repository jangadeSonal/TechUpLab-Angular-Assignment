import { TestBed } from '@angular/core/testing';

import { AddPinService } from './add-pin.service';

describe('AddPinService', () => {
  let service: AddPinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
