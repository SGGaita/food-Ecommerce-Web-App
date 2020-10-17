import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';
import jwt_decode from 'jwt-decode';
import { CustomersModelServer } from '../_models/customers';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit {
  detailsForm: FormGroup;
  addressForm: FormGroup;
  passwordForm: FormGroup;

  userData: any;
  customerProfile: any;
  fname: any;
  lname: any;
  email: any;
  address: any;
  city: any;
  region: any;
  primaryPhone: any;
  secondaryPhone: any;

  add_new: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private customerService: CustomerService,
    public cust_Auth: CustomerAuthenticationService
  ) {}

  ngOnInit(): void {
    //Initialize forms
    //details form
    this.detailsForm = this.formBuilder.group({
      fname: [null],
      lname: [null],
      email: [null],
      primaryPhone: [null],
    });

    //address form
    this.addressForm = this.formBuilder.group({
      fname: [null],
      lname: [null],
      email: [null],
      primaryPhone: [null],
      address: [null],
      city: [null],
      region: [null],
      secondaryPhone: [null],
      additional_info: [null]
    });

    //password form
    this.passwordForm = this.formBuilder.group({
      password: [null],
      cpassword: [null],
      npassword: [null],
    });

    //fetch user token and decode
    let customerToken = this.cust_Auth.getToken();
    console.log('Customer token', customerToken);
    var decoded = jwt_decode(customerToken);
    console.log('Decoded token', decoded.id_customer);

    //fetch all customer details
    this.customerService
      .getCustomerById(decoded.id_customer)
      .subscribe((data) => {
        console.log('customer details', data);
        this.customerProfile = data;
        this.fname = this.customerProfile.firstName;
        this.lname = this.customerProfile.lastName;
        this.email = this.customerProfile.email;
        this.address = this.customerProfile.address;
        this.city = this.customerProfile.city;
        this.region = this.customerProfile.region;
        this.primaryPhone = this.customerProfile.primaryPhone;
        this.secondaryPhone = this.customerProfile.secondaryPhone;

        //populate details form
        this.detailsForm.patchValue({
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          phone: this.primaryPhone,
        });
      });
  }

  submit(btn_value: string) {
    //console.log("This details form", this.detailsForm.value)
    switch (btn_value) {
      case 'dets':
        console.log('This details form', this.detailsForm.value);
        break;
      case 'address':
        console.log('This address form');
        this.add_new = false;
        break;
      case 'pwd':
        console.log('This password form', this.passwordForm.value);
        break;
      default:
        console.log('No value has been selected');
    }
  }

  addNewAddress(btn_value) {
    switch (btn_value) {
      case 'yes':
        this.add_new = true;
        break;
      case 'no':
        console.log('This address form');
        this.add_new = false;
        break;
      default:
        console.log('No value has been selected');
    }
  }
}
