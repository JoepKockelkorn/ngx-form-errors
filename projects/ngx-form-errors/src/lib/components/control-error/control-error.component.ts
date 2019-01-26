import { ChangeDetectorRef, Component, Inject, Input, OnDestroy } from '@angular/core';

import { CONTROL_ERROR_CLASS } from '../../control-error-class';

@Component({
  selector: 'nfe-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnDestroy {
  _text: string;
  _hide = true;

  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(@Inject(CONTROL_ERROR_CLASS) public controlErrorClass: string, private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.cdr.detach();
  }
}
