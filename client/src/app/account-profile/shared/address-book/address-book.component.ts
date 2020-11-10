import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerAuthenticationService } from 'src/app/_auth/customer-authentication.service';
import { CustomerService } from 'src/app/_services/customer.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  addressForm: FormGroup;
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

  constructor( private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService) { }

  ngOnInit(): void {

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

     //fetch user token and decode
     let customerToken = this.custAuthService.getToken();
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
      })
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

  submit(){

  }

}
