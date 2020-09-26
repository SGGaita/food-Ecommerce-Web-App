import { TestBed } from '@angular/core/testing';

import { CustomerAuthenticationService } from './customer-authentication.service';

describe('CustomerAuthenticationService', () => {
  let service: CustomerAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
