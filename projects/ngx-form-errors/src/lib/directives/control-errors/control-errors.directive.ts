import * as core from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EMPTY, merge, Observable } from 'rxjs';

import { ControlErrorComponent } from '../../components/control-error/control-error.component';
import { FORM_ERRORS, FormErrors } from '../../form-errors';
import { ControlErrorContainerDirective } from '../control-error-container/control-error-container.directive';
import { FormSubmitDirective } from '../form-submit/form-submit.directive';

@core.Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements core.OnInit, core.OnDestroy {
  submit$: Observable<Event>;
  ref: core.ComponentRef<ControlErrorComponent>;
  container: core.ViewContainerRef;

  @core.Input()
  customErrors: FormErrors = {};

  constructor(
    @core.Self() private control: NgControl,
    @core.Inject(FORM_ERRORS) private errors: FormErrors,
    @core.Optional() @core.Host() private form: FormSubmitDirective,
    private vcr: core.ViewContainerRef,
    private resolver: core.ComponentFactoryResolver,
    @core.Optional() controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit() {
    merge(this.submit$, this.control.valueChanges)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.customErrors[firstKey] || this.errors[firstKey];
          const text = getError ? getError(controlErrors[firstKey]) : '';
          this.setError(text);
        } else if (this.ref) {
          this.ref.destroy();
        }
      });
  }

  ngOnDestroy() {}

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }

    this.ref.instance.text = text;
  }
}
