import { LengthError } from '../models/length-error.model';

export function getValueError(required: string | number, actual: number | string): string {
  return `Expected ${required} but got ${actual}`;
}

export function getLengthError({ actualLength, requiredLength }: LengthError): string {
  return getValueError(requiredLength, actualLength);
}
