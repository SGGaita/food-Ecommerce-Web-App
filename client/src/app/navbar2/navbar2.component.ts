import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { CartModelServer } from '../_models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  cartData: CartModelServer;
  cartTotal: number

 
  userLogged: Boolean =true;

  constructor(private router:Router, private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cartTotals$.subscribe(total =>{
      this.cartTotal = total;
    });

    this.cartService.cartDataObs$.subscribe(data => {this.cartData = data;
      console.log("Cart data",this.cartData)})
  }


  myAccount(){
    this.userLogged = true

    if (!this.userLogged ){
      this.router.navigateByUrl('/customer/login')
    }else {
      this.router.navigateByUrl('/customer/profile')
    }
    
  }

  myOrders(){
    if (!this.userLogged ){
      this.router.navigateByUrl('/customer/login')
    }else {
      this.router.navigateByUrl('/customer/my-orders')
    }
   
  }

}
