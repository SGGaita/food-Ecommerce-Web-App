import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  count: any;
  orders: any;

  constructor(
    private title: Title,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.orderService.getAllDistinctOrders().subscribe(
      (data) => {
        console.log('Distinct orders', data);
        this.count = data.count;
        this.orders = data.orders;
        /** spinner ends after api fetch is complete */
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refresh() {
    this.ngOnInit();
  }
}
