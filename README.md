# ngx-form-errors - Automatically show errors in Angular Reactive Forms 🎩 🎉

## Getting started

### Install via NPM

`npm i <scope>/ngx-form-errors`

### Import in feature module

```typescript
import { FormErrorsModule } from '<scope>/ngx-form-errors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [FormsModule, ReactiveFormsModule, FormErrorsModule],
  ...
})
export class MyFeatureModule {}
```

### Optional: configure in AppModule using `forRoot` method

```typescript
import { FormErrorsModule } from '<scope>/ngx-form-errors';

@NgModule({
  ...
  imports: [
    ...
    FormErrorsModule.forRoot({
      triggerOnBlur: false,
      // more options available, see API below
    })
  ],
  ...
})
export class AppModule {}
```

## Basic use

```typescript
// my.component.ts
export class MyComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
}
```

```html
<!-- my.component.html -->
<div [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" formControlName="name" />
  </div>

  <div>
    <button type="submit">Submit form</button>
  </div>
</div>
```

### Now, when using the form, errors magically show up 🦄

// TODO: add gif of action

## Global custom configuration

// TODO: add api?

## Custom Errors

// TODO: showcase

## Write your own template

// TODO: showcase

## Specify container (for checkboxes) with `controlErrorContainer` directive

// TODO: showcase

## How to style

The FormSubmitDirective which is being used under water adds a 'submitted' class to the form when being submitted. We can add this in a selector to show conditional styling.

```css
/* basic styling */
input.ng-touched.ng-invalid {
  border: 1px solid red;
}

/* using the 'submitted' class */
form.submitted input.ng-invalid {
  border: 1px solid red;
}

/* ...add styling here for more controls, like select, radio, etc. */
```

Under water the ControlErrorsDirective adds a ControlErrorComponent to show the error. By default it will use this html:

```html
<p class="control-error">{{ error }}</p>
```

You can override the class that is assigned via the `forRoot` method:

```typescript
// app.module.ts
import { FormErrorsModule } from '<scope>/ngx-form-errors';

@NgModule({
  ...
  imports: [
    ...
    FormErrorsModule.forRoot({
      controlErrorClass: 'control-error' // this is the default
    })
  ],
  ...
})
export class AppModule {}
```

```css
/* you can override the default class */
.control-error {
  color: purple;
}

/* or assign your own class (use 'my-own-class' in the forRoot method) */
.my-own-class {
  color: pink;
}
```

## Use your own component for errors

// TODO: showcase

## Todo list

- [x] ~~Add Blur behavior for controls (and option to disable)~~
- [x] ~~Add support for a template~~
- [x] ~~Showcase container~~
- [x] ~~Add support for groups/array~~
- [x] Edit global configuration options via forRoot method
- [ ] Document
  - [x] basic use
  - [x] global styling of form
  - [x] styling of built-in ControlErrorComponent
  - [ ] API overview
  - [ ] container
  - [ ] template
  - [ ] triggerOnBlur/triggerOnSubmit
- [ ] Prepare for NPM
  - [ ] Figure out where to publish (scope?)
  - [ ] Setup package.json
  - [ ] Publish and tag the release
