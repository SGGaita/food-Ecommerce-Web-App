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
  ordersOpen: any;

  public searchText: string;
  public searchState: number;

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
      this.ordersOpen = data.orders.filter(obj => obj.order_state ===  0 || obj.order_state ===  1 || obj.order_state ===  2);
      this.spinner.hide();
    },
    err=>{});
  }

  refresh() {
    this.ngOnInit();
  }
}
