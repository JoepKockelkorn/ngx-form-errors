import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormErrorsComponent } from './ngx-form-errors.component';

describe('NgxFormErrorsComponent', () => {
  let component: NgxFormErrorsComponent;
  let fixture: ComponentFixture<NgxFormErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
