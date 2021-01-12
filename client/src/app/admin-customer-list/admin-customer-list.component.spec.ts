import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerListComponent } from './admin-customer-list.component';

describe('AdminCustomerListComponent', () => {
  let component: AdminCustomerListComponent;
  let fixture: ComponentFixture<AdminCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
