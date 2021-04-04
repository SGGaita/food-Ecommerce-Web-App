import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    private spinner: NgxSpinnerService,
    private matDialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.orderService.getAllDistinctOrders().subscribe(
      (data) => {
        this.count = data.count;
        this.ordersOpen = data.orders.filter((obj) => obj.order_state === 0 || obj.order_state === 1 || obj.order_state === 2);
        console.log('Distinct open orders', this.ordersOpen);
        /** spinner ends after api fetch is complete */
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(order: any) {

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'logout-modal-component';
    dialogConfig.height = '90%';
    dialogConfig.width = '55%';
    dialogConfig.data = {
      reference: order.order_reference,
      order_state: order.order_state,
      name: order.fname + ' ' + order.lname,
      id_order: order.id_order_fk,
      createdAt: order.createdAt,
      total: order.total,
      product_name: order.product_name,
    }; 

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(
      AdminOrderServiceComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      let data = JSON.parse(result)
     
      const updateInfo ={
        id_order: data.id_order,
        order_state:data.new_state,
       comment:data.comments
      }

      this.orderService.updateOrder(updateInfo)
      .subscribe(data=>{
        console.log("Feedback",data)
        this.ngOnInit()
      })

      
    });
  }

  refresh() {
    this.ngOnInit();
  }
}
