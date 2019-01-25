import { TestBed } from '@angular/core/testing';

import { NgxFormErrorsService } from './ngx-form-errors.service';

describe('NgxFormErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFormErrorsService = TestBed.get(NgxFormErrorsService);
    expect(service).toBeTruthy();
  });
});
