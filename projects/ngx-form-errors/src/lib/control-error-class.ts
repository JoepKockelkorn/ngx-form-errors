import { InjectionToken } from '@angular/core';

export const CONTROL_ERROR_CLASS = new InjectionToken('CONTROL_ERROR_CLASS', {
  providedIn: 'root',
  factory: () => 'control-error'
});
