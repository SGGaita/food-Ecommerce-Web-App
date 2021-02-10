import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../../../_auth/customer-authentication.service';
import { CustomerService } from '../../../_services/customer.service';
import jwt_decode from 'jwt-decode';

import { OrderService } from '../../../_services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any;

  constructor(private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    //fetch user token and decode
    let customerToken = this.custAuthService.getToken();
    console.log('Customer token', customerToken);
    var decoded = jwt_decode(customerToken);
    console.log('Decoded token', decoded.id_customer);

     //fetch orders by customer id
     this.orderService.getLatestOrderById(decoded.id_customer)
     .subscribe(data =>{
       this.orders = data
       console.log("These latest orders are", this.orders)
     })
  }

}
