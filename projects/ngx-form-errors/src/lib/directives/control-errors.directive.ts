import {
  AfterContentInit,
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EMPTY, fromEvent, merge, Observable } from 'rxjs';

import { ControlErrorBaseComponent } from '../components/control-error/control-error-base-component';
import { FORM_ERRORS_CONFIG } from '../injection-tokens';
import { FormErrorsConfig } from '../models/form-errors-config.model';
import { FormErrors } from '../models/form-errors.model';

import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  selector: '[formControl], [formControlName], [formGroup], [formGroupName], [formArray], [formArrayName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input()
  customErrors: FormErrors = {};

  @Input()
  set triggerOnBlur(value: boolean) {
    this._triggerOnBlur = value;
  }

  @Input()
  set triggerOnSubmit(value: boolean) {
    this._triggerOnSubmit = value;
  }

  @Input()
  errorTemplate: TemplateRef<any> = null;

  private _triggerOnBlur: boolean;
  private _triggerOnSubmit: boolean;
  private submit$: Observable<Event>;
  private touched$: Observable<Event>;
  private ref: ComponentRef<ControlErrorBaseComponent>;
  private container: ViewContainerRef;
  private isTouched = false;
  private isSubmitted = false;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() @Self() private control: NgControl,
    @Optional() @Self() private controlContainer: ControlContainer,
    @Inject(FORM_ERRORS_CONFIG) private config: FormErrorsConfig,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() private controlErrorContainer: ControlErrorContainerDirective
  ) {}

  ngOnInit() {
    this._triggerOnBlur = this.config.triggerOnBlur;
    this._triggerOnSubmit = this.config.triggerOnSubmit;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.submit$.pipe(untilDestroyed(this)).subscribe(() => (this.isSubmitted = true));
    this.container = this.controlErrorContainer ? this.controlErrorContainer.vcr : this.vcr;
  }

  ngAfterContentInit() {
    this.touched$ = this.el ? fromEvent(this.el.nativeElement, 'blur') : EMPTY;
    this.touched$.pipe(untilDestroyed(this)).subscribe(() => (this.isTouched = true));
  }

  ngAfterViewInit() {
    const control = this.control || this.controlContainer.control;
    merge(this.submit$, control.valueChanges, this.touched$)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const controlErrors = control.errors;
        const showOnSubmit = this._triggerOnSubmit ? this.isSubmitted : false;
        const showOnBlur = this._triggerOnBlur ? this.isTouched : false;
        const showError = showOnSubmit || showOnBlur;
        if (controlErrors && showError) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.customErrors[firstKey] || this.config.formErrors[firstKey];
          const text = getError ? getError(controlErrors[firstKey]) : '';
          this.setError(text);
        } else if (this.ref) {
          this.ref.destroy();
          this.ref = null;
        }
      });
  }

  ngOnDestroy() {}

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(this.config.controlErrorComponentType);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
    this.ref.instance.template = this.errorTemplate;
  }
}
