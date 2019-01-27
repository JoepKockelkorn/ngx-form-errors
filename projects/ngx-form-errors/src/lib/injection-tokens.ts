import { InjectionToken } from '@angular/core';

import { FormErrorsConfig } from './models/form-errors-config.model';

export const FORM_ERRORS_CONFIG = new InjectionToken<FormErrorsConfig>('FORM_ERRORS_CONFIG');
