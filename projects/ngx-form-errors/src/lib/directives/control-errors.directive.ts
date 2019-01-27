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
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EMPTY, fromEvent, merge, Observable } from 'rxjs';

import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FORM_ERRORS } from '../form-errors';
import { FormErrors } from '../models/form-errors.model';

import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input()
  customErrors: FormErrors = {};

  @Input()
  triggerOnBlur = true;

  @Input()
  triggerOnSubmit = true;

  @Input()
  errorTemplate: TemplateRef<any> = null;

  private submit$: Observable<Event>;
  private touched$: Observable<Event>;
  private ref: ComponentRef<ControlErrorComponent>;
  private container: ViewContainerRef;
  private isTouched = false;
  private isSubmitted = false;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Self() private control: NgControl,
    @Inject(FORM_ERRORS) private errors: FormErrors,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() private controlErrorContainer: ControlErrorContainerDirective
  ) {}

  ngOnInit() {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.submit$.pipe(untilDestroyed(this)).subscribe(() => (this.isSubmitted = true));
    this.container = this.controlErrorContainer ? this.controlErrorContainer.vcr : this.vcr;
  }

  ngAfterContentInit() {
    this.touched$ = fromEvent(this.el.nativeElement, 'blur');
    this.touched$.pipe(untilDestroyed(this)).subscribe(() => (this.isTouched = true));
  }

  ngAfterViewInit() {
    merge(this.submit$, this.control.valueChanges, this.touched$)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const controlErrors = this.control.errors;
        const showOnSubmit = this.triggerOnSubmit ? this.isSubmitted : false;
        const showOnBlur = this.triggerOnBlur ? this.isTouched : false;
        const showError = showOnSubmit || showOnBlur;
        if (controlErrors && showError) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.customErrors[firstKey] || this.errors[firstKey];
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
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
    this.ref.instance.template = this.errorTemplate;
  }
}
