import { Component, OnInit } from '@angular/core';
import { CartModelServer } from '../_models/cart';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cartDataObs$.subscribe(data =>{
      this.cartData = data
    });

    this.cartService.cartTotals$.subscribe(data => this.cartTotal = data)
  }

  ChangeQuantity(index: number, increase: Boolean){
    this.cartService.UpdateCartData(index, increase)

  }

}
