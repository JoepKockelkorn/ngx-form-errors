import { ChangeDetectorRef, Input, OnDestroy, TemplateRef } from '@angular/core';

export abstract class ControlErrorBaseComponent implements OnDestroy {
  _text: string;
  _hide = true;

  @Input() template: TemplateRef<any> = null;

  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this._cdr.detectChanges();
    }
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this._cdr.detach();
  }
}
