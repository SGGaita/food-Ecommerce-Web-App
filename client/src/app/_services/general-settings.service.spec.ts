import { TestBed } from '@angular/core/testing';

import { GeneralSettingsService } from './general-settings.service';

describe('GeneralSettingsService', () => {
  let service: GeneralSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
