import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
   message: string;
   orderId: number;
   order_reference:string;
   products;
   cartTotal: number;

  constructor(private router: Router,
    private orderService: OrderService,) { 

      const navigation = this.router.getCurrentNavigation()
      const state = navigation.extras.state as {
        message: string,
        products: ProductResponseModel[],
        orderId: number,
        order_reference:string,
        total: number
      };

      this.message = state.message;
      this.products = state.products;
      this.orderId = state.orderId;
      this.order_reference = state.order_reference;
      this.cartTotal = state.total;
    }

  ngOnInit(): void {

    console.log("Products are", this.products)
    //fetch product by id
    
  }

}
  
    
    interface ProductResponseModel{
      id: number;
      title: string;
      description: string;
      price: number;
      quantityOrdered: number;
      image: string;
    }

 
