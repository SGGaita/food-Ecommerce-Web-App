import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from 'src/app/_auth/customer-authentication.service';
import { CustomerService } from 'src/app/_services/customer.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

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

  constructor(private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService,) { }

  ngOnInit(): void {

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

}
