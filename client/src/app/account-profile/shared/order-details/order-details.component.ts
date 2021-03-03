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
       
       //get unique value if repeated
       const unique = (value, index, self) =>{
        return self.indexOf(value) === index
      }
       this.reference = this.order.map(x=>x.order_reference).filter(unique)
       this.order_state = this.order.map(x=>x.order_state).filter(unique)
       this.total = +this.order.map(x=>x.total)
       this.quantityOrdered = this.order.map(x=>x.quantityOrdered).filter(unique)
       this.fname = this.order.map(x=>x.fname)
       this.lname = this.order.map(x=>x.lname)
       this.payment_name = this.order.map(x=>x.payment_name)
       this.address = this.order.map(x=>x.address)
       this.city = this.order.map(x=>x.city)
       this.region = this.order.map(x=>x.region)
       this.spinner.show();
     }, err =>{

       
     })
    })
  }

}
