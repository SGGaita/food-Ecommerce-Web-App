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
  radio_state : boolean = false
  

  constructor(private custAuthService: CustomerAuthenticationService ,private cartService: CartService, private orderService: OrderService, private router: Router,
     private spinner: NgxSpinnerService, private fb: FormBuilder, private sharedService: SharedService,private customerService: CustomerService) { }

  ngOnInit(): void {

    

    //Initialise form

    this.checkoutForm = this.fb.group({
      payment: [null],
      terms: [null]
    })

    this.cartService.cartDataObs$.subscribe(data => {this.cartData = data; console.log(this.cartData)})
    
    this.cartService.cartTotals$.subscribe(total => {this.cartTotal = total; console.log(this.cartTotal)})

    //fetch payment modes
    this.orderService.getAllPaymentModes()
    .subscribe(mod =>{
      console.log("Payments", mod)
      this.modes = mod.modes
    })

    //check if radio button is selected
    console.log("radio button", this.checkoutForm.value.payment)

    //get and decode token
    //fetch user token and decode
    let customerToken = this.custAuthService.getToken();
    console.log('Customer token', customerToken);
    let decoded = jwt_decode(customerToken);
    console.log('Decoded token', decoded.id_customer);
    
  }

  //check if radio buttons are selected
  paymentChange(){
    let radio_value = this.checkoutForm.value.payment
    console.log(radio_value)

    let terms = this.checkoutForm.value.terms
    console.log("Checkbox", terms)
   if (radio_value == null || terms == null){
     //window.alert("This is null")
     this.radio_state = false;
   } else if (radio_value != null && terms != null){
    this.radio_state = true;
   }
  }


  //check if terms and conditions are checked
  toggleEditable(event) {
    //let radio_value = this.checkoutForm.value.payment
    //if ( !event.target.checked || radio_value == null ) {
     //   this.radio_state = false;
       // window.alert("I m not checked")
  // }else{
    //window.alert("I m checked")
   // this.radio_state = true;
   //}
}

  //checkout method
  onCheckout(){
     

     
this.spinner.show().then(p =>{
  console.log("spinner", p)

  var payment_value = +this.checkoutForm.value.payment
console.log (payment_value)

switch(payment_value) {
  case 1:
    console.log("This is Cash")
    this.cartService.CheckoutFromCart(2,payment_value);
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
})
    




  }

}
