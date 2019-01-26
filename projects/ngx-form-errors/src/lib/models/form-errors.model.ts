import { LengthError } from './length-error.model';
import { MaxError } from './max-error.model';
import { MinError } from './min-error.model';
import { PatternError } from './pattern-error.model';

export interface FormErrors {
  min?: (error: MinError) => string;
  max?: (error: MaxError) => string;
  required?: () => string;
  email?: () => string;
  minlength?: (error: LengthError) => string;
  maxlength?: (error: LengthError) => string;
  pattern?: (error: PatternError) => string;
}
