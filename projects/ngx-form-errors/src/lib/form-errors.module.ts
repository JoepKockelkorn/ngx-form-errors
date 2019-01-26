import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';

const DIRECTIVES = [ControlErrorContainerDirective, ControlErrorsDirective, FormSubmitDirective];
const COMPONENTS = [ControlErrorComponent];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  entryComponents: [...COMPONENTS],
  exports: [...DIRECTIVES, ...COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormErrorsModule {}
