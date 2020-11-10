import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  order: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(orderId => {
      this.id = orderId;

     //fetch order by id
     this.orderService.getSingleOrderById(this.id)
     .subscribe(data=>{
       this.order = data;
       console.log("this order", this.order)
     })
    })
  }

}
