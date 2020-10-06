import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { CartModelServer } from '../_models/cart';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';
import {CustomerAuthenticationService} from '../_auth/customer-authentication.service'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup

  cartTotal: number;
  cartData: CartModelServer
  modes: [] =[];
  userData: any;
  

  constructor(private custAuthService: CustomerAuthenticationService ,private cartService: CartService, private orderService: OrderService, private router: Router,
     private spinner: NgxSpinnerService, private fb: FormBuilder, private sharedService: SharedService,private customerService: CustomerService) { }

  ngOnInit(): void {

    //Initialise form

    this.checkoutForm = this.fb.group({
      payment: [null]
    })

    this.cartService.cartDataObs$.subscribe(data => {this.cartData = data; console.log(this.cartData)})
    
    this.cartService.cartTotals$.subscribe(total => {this.cartTotal = total; console.log(this.cartTotal)})

    //fetch payment modes
    this.orderService.getAllPaymentModes()
    .subscribe(mod =>{
      console.log("Payments", mod)
      this.modes = mod.modes
    })

    //get customer details
    this.sharedService.sharedCustomer
    .subscribe(data =>{
      console.log("customer infor", data);
      this.userData = data
      console.log(this.userData.fname)

      //fetch all customer details
      this.customerService.getCustomerById(this.userData.id_customer)
      .subscribe(data=>{
        console.log("customer details", data)
      })
    })


    //get and decode token
    let customerToken = this.custAuthService.getToken()
    console.log("Customer token", customerToken)
    var decoded = jwt_decode(customerToken);
    console.log("Decode", decoded)
  }

  //checkout method
  onCheckout(){

    //this.spinner.show()


var payment_value = this.checkoutForm.value.payment
console.log (payment_value)

switch(payment_value) {
  case 1:
    console.log("This is Cash")
    break;
  case 2:
    console.log("This is Card")
    break;
  case 3:
    console.log("This is Mpesa")
    break;
  case 4:
    console.log("This is Airtel")
    break;
}

  }

}
