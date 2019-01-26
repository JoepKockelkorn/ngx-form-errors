import { InjectionToken } from '@angular/core';

import { FormErrors } from './models/form-errors.model';
import { LengthError } from './models/length-error.model';

function getValueError(required: string | number, actual: number | string): string {
  return `Expected ${required} but got ${actual}`;
}

function getLengthError({ actualLength, requiredLength }: LengthError): string {
  return getValueError(requiredLength, actualLength);
}

export const DEFAULT_ERRORS: FormErrors = {
  required: () => `This field is required`,
  minlength: getLengthError,
  maxlength: getLengthError,
  email: () => `Please enter a valid e-mail`,
  max: ({ actual, max }) => getValueError(max, actual),
  min: ({ actual, min }) => getValueError(min, actual),
  pattern: ({ actualValue, requiredPattern }) => getValueError(`'${requiredPattern}'`, actualValue)
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => DEFAULT_ERRORS
});
