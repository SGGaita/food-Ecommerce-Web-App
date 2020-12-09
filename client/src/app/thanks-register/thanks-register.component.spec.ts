import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksRegisterComponent } from './thanks-register.component';

describe('ThanksRegisterComponent', () => {
  let component: ThanksRegisterComponent;
  let fixture: ComponentFixture<ThanksRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
