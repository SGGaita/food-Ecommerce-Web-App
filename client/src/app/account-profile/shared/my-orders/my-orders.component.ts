import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../../../_auth/customer-authentication.service';
import { CustomerService } from '../../../_services/customer.service';
import jwt_decode from 'jwt-decode';

import { OrderService } from '../../../_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  ordersOpen: any;
  ordersClosed: any;
  p: number = 1;
  count: any

  constructor(
    private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    //fetch user token and decode
    let customerToken = this.custAuthService.getToken();
    console.log('Customer token', customerToken);
    var decoded = jwt_decode(customerToken);
    console.log('Decoded token', decoded.id_customer);

    //fetch orders by customer id
    this.spinner.show();
    this.orderService.getAllDistinctOrders().subscribe(
      (data) => {
        console.log(data);
        //filter open orders
        this.ordersOpen = data.orders.filter(obj => obj.order_state ===  0 || obj.order_state ===  1 || obj.order_state ===  2);
        console.log("Distinct orders", this.ordersOpen )
         //filter closed orders
         this.ordersClosed = data.orders.filter(obj => obj.order_state ===  3 || obj.order_state ===  4 );
        this.spinner.hide();
      },
      (err) => {}
    );
  }


  cancel(id:number, reference: string){
    if (window.confirm(`Are you sure you want to cancel order with reference ${reference}?`)){
      this.spinner.show();
      //call cancel order api
      const updateInfo ={
        id_order: id,
        order_state:4,
        cancelledBy:"Customer cancellation"
      }
      this.orderService.cancelOrder(updateInfo)
      .subscribe(data =>{
        console.log("Distinct orders after refresh", data )
         this.ngOnInit()
        this.spinner.hide();
        
      })
    } else{
      return;
    }
  }

  refresh(){
    this.ngOnInit()
  }
}
