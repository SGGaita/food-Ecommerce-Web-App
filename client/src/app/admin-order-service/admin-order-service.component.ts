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
}

@Component({
  selector: 'app-admin-order-service',
  templateUrl: './admin-order-service.component.html',
  styleUrls: ['./admin-order-service.component.css']
})
export class AdminOrderServiceComponent implements OnInit {
  pageTitle= "Serve orders | Maungano Food Express"
  orderForm: FormGroup

  constructor(private title: Title, private fb: FormBuilder , public dialogRef: MatDialogRef<AdminOrderServiceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)

    this.orderForm = this.fb.group(
      {
        order_state:[null]
      }
    )
  }


 //close dialog
  close(order: any) {
    console.log("Order", order)
    this.dialogRef.close("test");
  }

}
