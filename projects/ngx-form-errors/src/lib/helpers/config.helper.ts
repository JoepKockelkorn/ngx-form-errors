import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { DEFAULT_ERRORS } from '../models/default-form-errors.model';
import { FormErrorsConfig } from '../models/form-errors-config.model';

/**
 * Created a function for this. When it was a const, Type<ControlErrorBaseComponent> was undefined when used.
 */
export function getDefaultConfig(): FormErrorsConfig {
  return {
    formErrors: DEFAULT_ERRORS,
    triggerOnBlur: true,
    triggerOnSubmit: true,
    controlErrorClass: 'control-error',
    controlErrorComponentType: ControlErrorComponent
  };
}
