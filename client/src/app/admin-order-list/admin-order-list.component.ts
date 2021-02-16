import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css'],
})
export class AdminOrderListComponent implements OnInit {
  pageTitle = 'Orders list | Maungano Food Express';
  orders: any;

  constructor(
    private title: Title,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.spinner.show();
    this.orderService.getAllDistinctOrders().subscribe((data) => {
      console.log(data);
      this.orders = data.orders;
      this.spinner.hide();
    },
    err=>{});
  }

  refresh() {
    this.ngOnInit();
  }
}
