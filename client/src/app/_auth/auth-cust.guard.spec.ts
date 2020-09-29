import { TestBed } from '@angular/core/testing';

import { AuthCustGuard } from './auth-cust.guard';

describe('AuthCustGuard', () => {
  let guard: AuthCustGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCustGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
