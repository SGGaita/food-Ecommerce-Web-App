import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr'; 
import { ProductsService } from '../_services/products.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-admin-cat-create',
  templateUrl: './admin-cat-create.component.html',
  styleUrls: ['./admin-cat-create.component.css']
})
export class AdminCatCreateComponent implements OnInit {
  pageTitle = ' Create menu category | Maungano Food Express';
  restaurantCategoryForm: FormGroup;

  submitted: boolean = false;
  successMsg: string;
  errorMsg: any;

  constructor(private title: Title,
              private fb: FormBuilder,
              private productService : ProductsService, 
              private spinner: NgxSpinnerService,
              private toast: ToastrService,
              private location: Location) { }



  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)

    this.restaurantCategoryForm = this.fb.group({
      prod_category_name: ["", Validators.required],
      prod_category_description: ["", Validators.required],
      cat_status:["", Validators.required]
    });
  }

  submit(){
    this.submitted = true
    var categoryName = this.restaurantCategoryForm.value.prod_category_name
    var categoryDescription = this.restaurantCategoryForm.value.prod_category_description
    var categoryStatus = +this.restaurantCategoryForm.value.cat_status
    const newCat = {
      prod_category_name : categoryName,
      prod_category_description : categoryDescription,
      cat_status : categoryStatus
    }

    console.log("body",newCat)
    this.productService.addNewCategory(newCat)
    .subscribe(data=>{
      //console.log("From server", data)
      this.toast.success(
        `${data.message} `,
        'Category saved',
        {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        }
      );
      this.submitted = false;
      this.ngOnInit()
    }, err =>{
      
      this.toast.error(
        `${err}: Contact Admin is the error persists `, 'Submission failed',
        {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        })
        this.submitted = false

    })
  }

back(){
  this.location.back()
}

}
