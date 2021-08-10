import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminOrderServiceComponent } from '../admin-order-service/admin-order-service.component';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  count: any;
  ordersOpen: any;

  public searchText: string;
  public searchState: number;

  p: number = 1;

  constructor(
    private title: Title,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.orderService.getAllDistinctOrders().subscribe(
      (data) => {
        
        this.ordersOpen = data.orders.filter((obj) => obj.order_state === 0 || obj.order_state === 1 || obj.order_state === 2);
        this.count = data.length;
        console.log('Distinct open orders', this.ordersOpen);
        /** spinner ends after api fetch is complete */
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel(id:number){
    console.log(id)
  }

  refresh() {
    this.ngOnInit();
  }
}
