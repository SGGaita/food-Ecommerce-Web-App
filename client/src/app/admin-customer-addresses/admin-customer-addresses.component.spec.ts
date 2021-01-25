import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerAddressesComponent } from './admin-customer-addresses.component';

describe('AdminCustomerAddressesComponent', () => {
  let component: AdminCustomerAddressesComponent;
  let fixture: ComponentFixture<AdminCustomerAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
