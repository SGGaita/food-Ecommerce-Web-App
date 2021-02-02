import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {
  orders: any;

  constructor(private title: Title, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders()
    .subscribe(data =>{
      console.log(data)
      this.orders = data.orders;
      
    })
  }

}
