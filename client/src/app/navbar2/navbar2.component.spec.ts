import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar2Component } from './navbar2.component';

describe('Navbar2Component', () => {
  let component: Navbar2Component;
  let fixture: ComponentFixture<Navbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
