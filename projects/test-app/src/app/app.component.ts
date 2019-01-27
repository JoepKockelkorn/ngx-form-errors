import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  animalErrors: FormErrors = {
    required: () => `Please create at least one animal`
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      check: [false, [Validators.requiredTrue]],
      childForm: this.fb.group({
        animal: ['', [Validators.required]]
      }),
      animals: this.fb.array([], [Validators.required])
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    alert('valid!');
  }

  get animals() {
    return this.form.get('animals') as FormArray;
  }

  addAnimal() {
    this.animals.insert(this.animals.length, this.createAnimalForm());
  }

  private createAnimalForm() {
    return this.fb.group({
      name: ['', [Validators.required]]
    });
  }
}
