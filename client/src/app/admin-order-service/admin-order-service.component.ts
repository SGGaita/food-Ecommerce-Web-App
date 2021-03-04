import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Title } from '@angular/platform-browser';

export interface DialogData {
  reference: string;
  order_state: number;
  name: string;
  id_order: number;
  createdAt: Date;
  total: number;
  product_name:string;
}

@Component({
  selector: 'app-admin-order-service',
  templateUrl: './admin-order-service.component.html',
  styleUrls: ['./admin-order-service.component.css']
})
export class AdminOrderServiceComponent implements OnInit {
  pageTitle: string
  orderForm: FormGroup

  constructor(private title: Title, private fb: FormBuilder , public dialogRef: MatDialogRef<AdminOrderServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.pageTitle = `Orders > Order ${this.data.reference} | Maungano Food Express`
    this.title.setTitle(this.pageTitle)

    this.orderForm = this.fb.group(
      {
        order_state:[null],
        comments: [null]
      }
    )
  }


 //close dialog
  close(order: any) {
    
    var order_state = +this.orderForm.value.order_state
    if (this.orderForm.value.comments){
      var comments = this.orderForm.value.comments
    }else{
      var comments:any = "No comments"
    }
    
    Object.assign(order,{new_state: order_state}, {comments: comments})
    console.log("new order", order)
    this.dialogRef.close(JSON.stringify(order));
  }

}
