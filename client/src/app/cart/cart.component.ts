import { Component, OnInit } from '@angular/core';
import { CartModelServer } from '../_models/cart';
import { CartService } from '../_services/cart.service';
import { Router } from '@angular/router';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService,
    private router: Router,
    public custAuthService: CustomerAuthenticationService) { }

  ngOnInit(): void {

    this.cartService.cartDataObs$.subscribe(data =>{
      this.cartData = data
    });

    this.cartService.cartTotals$.subscribe(data => this.cartTotal = data)
  }


  checkout() {
    if (this.custAuthService.isLoggedIn()) {
      this.router.navigateByUrl('/checkout');
    } else {
      //this.openDialog()

      let _state: any = 1;
      localStorage.setItem('stateToken', _state);
      this.router.navigateByUrl('customer/login');
    }
  }

  ChangeQuantity(index: number, increase: Boolean){
    this.cartService.UpdateCartData(index, increase)

  }

}
