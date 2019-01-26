import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrors } from 'ngx-form-errors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  customErrors: FormErrors = {
    required: () => "This field has a custom error, but is required. It also doesn't trigger on blur."
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
  }
}
