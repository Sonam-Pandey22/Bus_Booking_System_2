import { TestBed } from '@angular/core/testing';

import { BusBooking } from './bus-booking';

describe('BusBooking', () => {
  let service: BusBooking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusBooking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
