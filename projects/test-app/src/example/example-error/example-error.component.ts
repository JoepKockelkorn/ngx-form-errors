import { ChangeDetectorRef, Component } from '@angular/core';
import { ControlErrorBaseComponent } from 'ngx-form-errors';

@Component({
  selector: 'app-example-error',
  templateUrl: './example-error.component.html',
  styleUrls: ['./example-error.component.css']
})
export class ExampleErrorComponent extends ControlErrorBaseComponent {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
