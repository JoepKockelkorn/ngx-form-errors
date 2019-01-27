import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_ERRORS, FormErrorsModule } from 'ngx-form-errors';

import { ExampleErrorComponent } from '../example/example-error/example-error.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, ExampleErrorComponent],
  entryComponents: [ExampleErrorComponent],
  imports: [
    BrowserModule,
    FormErrorsModule.forRoot({
      formErrors: {
        ...DEFAULT_ERRORS,
        required: () => `This field is definitely required (configured in forRoot method)`
      }
      // controlErrorComponentType: ExampleErrorComponent
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
