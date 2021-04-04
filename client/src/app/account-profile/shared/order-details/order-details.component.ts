import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  order: any;
  reference: any;
  total: any;
  order_state: any;
  quantityOrdered: any;
  fname: number;
  lname: number;
  payment_name: number;
  address: any;
  city: any;
  region: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(orderId => {
      this.id = orderId;

     //fetch order by id
     this.spinner.show();
     this.orderService.getSingleOrderById(this.id)
     .subscribe(data=>{
       this.order = data;
       console.log("order details", this.order)
       
       //get unique value if repeated
       const unique = (value, index, self) =>{
        return self.indexOf(value) === index
      }
       this.reference = this.order.map(x=>x.order_reference).filter(unique)
       this.order_state = this.order.map(x=>x.order_state).filter(unique)
       this.total = +this.order.map(x=>x.total).filter(unique)
       this.quantityOrdered = this.order.map(x=>x.quantityOrdered).filter(unique)
       this.fname = this.order.map(x=>x.fname).filter(unique)
       this.lname = this.order.map(x=>x.lname).filter(unique)
       this.payment_name = this.order.map(x=>x.payment_name).filter(unique)
       this.address = this.order.map(x=>x.address).filter(unique)
       this.city = this.order.map(x=>x.city).filter(unique)
       this.region = this.order.map(x=>x.region).filter(unique)
       this.spinner.hide();
     }, err =>{

       
     })
    })
  }

}
