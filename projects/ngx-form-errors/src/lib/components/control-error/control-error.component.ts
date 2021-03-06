import { ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';

import { FORM_ERRORS_CONFIG } from '../../injection-tokens';
import { FormErrorsConfig } from '../../models/form-errors-config.model';

import { ControlErrorBaseComponent } from './control-error-base-component';

@Component({
  selector: 'nfe-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlErrorComponent extends ControlErrorBaseComponent {
  constructor(@Inject(FORM_ERRORS_CONFIG) public config: FormErrorsConfig, cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
