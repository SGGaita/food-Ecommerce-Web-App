import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';
import jwt_decode from 'jwt-decode';
import { CustomersModelServer } from '../_models/customers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit {
 
  
  

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
  orders: any;

  constructor(
   
    private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService,
    private orderService: OrderService
  ) {}

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

       

        //fetch orders by customer id
        this.orderService.getLatestOrderById(decoded.id_customer)
        .subscribe(data =>{
          this.orders = data
          console.log("These latest orders", this.orders)
        })
      });
  }

  submit(btn_value: string) {
    //console.log("This details form", this.detailsForm.value)
    switch (btn_value) {
      
      case 'address':
        console.log('This address form');
        this.add_new = false;
        break;
      default:
        console.log('No value has been selected');
    }
  }

  
}
