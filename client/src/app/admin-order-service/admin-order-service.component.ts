import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrderService } from '../_services/order.service';



@Component({
  selector: 'app-admin-order-service',
  templateUrl: './admin-order-service.component.html',
  styleUrls: ['./admin-order-service.component.css']
})
export class AdminOrderServiceComponent implements OnInit {
  pageTitle: string
  orderForm: FormGroup
  id: any;
  order: any = [];
  reference: any;
  fname: any;
  lname: any;
  products: any;
  total: any;
  status: any;

  constructor(private title: Title, private fb: FormBuilder,private orderService: OrderService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    //fetch and patch data to forms
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      )
      .subscribe((orderId) => {
        this.id = orderId;
        console.log("Route id is", this.id)
        this.orderService.getSingleOrderById(this.id)
        .subscribe(data=>{
          console.log("console",data)
          this.order = data
          //get unique value if repeated
       const unique = (value, index, self) =>{
        return self.indexOf(value) === index
      }

      

          this.reference = this.order.map(x=>x.order_reference).filter(unique)
          this.fname = this.order.map(x=>x.fname).filter(unique)
          this.lname = this.order.map(x=>x.lname).filter(unique)
          this.products = this.order.map(x=>x.product_name)
          this.total = this.order.map(x=>x.total).filter(unique)
          this.status = this.order.map(x=>x.order_state).filter(unique)

          this.pageTitle = `Orders > Order ${this.reference}  | Maungano Food Express`
          this.title.setTitle(this.pageTitle)
        })

      })
    

    this.orderForm = this.fb.group(
      {
        order_state:[null],
        comments: [null]
      }
    )
  }


 //close dialog
  submit() {
    
    var order_state = +this.orderForm.value.order_state
    if (this.orderForm.value.comments){
      var comments = this.orderForm.value.comments
    }else{
      var comments:any = "No comments"
    }
    
   
  }

  back(){

  }

}
