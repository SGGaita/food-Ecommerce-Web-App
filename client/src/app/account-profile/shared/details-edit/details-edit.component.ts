import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerAuthenticationService } from '../../../_auth/customer-authentication.service';
import { CustomerService } from '../../../_services/customer.service';
import { OrderService } from 'src/app/_services/order.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.css']
})
export class DetailsEditComponent implements OnInit {
  detailsForm: FormGroup;
  customerProfile: any;
  fname: any;
  lname: any;
  email: any;
  address: any;
  city: any;
  region: any;
  primaryPhone: any;
  secondaryPhone: any;
  orders: any;

  constructor(private formBuilder: FormBuilder,
    public custAuthService: CustomerAuthenticationService,
    private orderService: OrderService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    //Initialize forms
    //details form
    this.detailsForm = this.formBuilder.group({
      fname: [null],
      lname: [null],
      email: [null],
      primaryPhone: [null],
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
      // this.secondaryPhone = this.customerProfile.secondaryPhone;

       //populate details form
       this.detailsForm.patchValue({
         fname: this.fname,
         lname: this.lname,
         email: this.email,
         phone: this.primaryPhone,
       });

       //fetch orders by customer id
       this.orderService.getLatestOrderById(decoded.id_customer)
       .subscribe(data =>{
         this.orders = data
         console.log("These latest orders", this.orders)
       })
     });
 }


 //submit
 submit(){
   
 }
  }


