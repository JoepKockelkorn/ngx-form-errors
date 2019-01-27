import { Type } from '@angular/core';

import { ControlErrorBaseComponent } from '../components/control-error/control-error-base-component';

import { FormErrors } from './form-errors.model';

export interface FormErrorsConfig {
  formErrors?: FormErrors;
  triggerOnBlur?: boolean;
  triggerOnSubmit?: boolean;
  controlErrorClass?: string;
  controlErrorComponentType?: Type<ControlErrorBaseComponent>;
}
