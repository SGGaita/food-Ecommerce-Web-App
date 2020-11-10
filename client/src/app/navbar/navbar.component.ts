import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { CartService } from '../_services/cart.service';
import { CartModelServer } from '../_models/cart';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number

  _route_url = "/home"

  constructor(private router:Router, 
    private cartService: CartService,
    public custAuthService: CustomerAuthenticationService,) { }

  ngOnInit() {

    this.cartService.cartTotals$.subscribe(total =>{
      this.cartTotal = total;
    });

    this.cartService.cartDataObs$.subscribe(data => {this.cartData = data;
      console.log("Cart data",this.cartData)})

     
    



}

hasRoute(route: string){
  if (this.router.url.includes(route)){
    $('.header-wrapper').removeClass('black');
  } else {
    $('.header-wrapper').addClass('black');
  }
}




}


 

 


