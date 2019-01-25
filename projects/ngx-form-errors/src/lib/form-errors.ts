import { InjectionToken } from '@angular/core';

export interface FormErrors {
  required?: (error: any) => string;
  minlength?: (error: any) => string;
  // TODO: implement at least all default Angular errors
}

export const defaultErrors: FormErrors = {
  required: (_error: any) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
