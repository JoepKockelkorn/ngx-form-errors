import { getLengthError, getValueError } from '../helpers/error-message.helpers';

import { FormErrors } from './form-errors.model';

export const DEFAULT_ERRORS: FormErrors = {
  required: () => `This field is required`,
  minlength: getLengthError,
  maxlength: getLengthError,
  email: () => `Please enter a valid e-mail`,
  max: ({ actual, max }) => getValueError(max, actual),
  min: ({ actual, min }) => getValueError(min, actual),
  pattern: ({ actualValue, requiredPattern }) => getValueError(`'${requiredPattern}'`, actualValue)
};
