import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../_services/products.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-admin-subcat-create',
  templateUrl: './admin-subcat-create.component.html',
  styleUrls: ['./admin-subcat-create.component.css'],
})
export class AdminSubcatCreateComponent implements OnInit {
  pageTitle = ' Create menu subcategory | Maungano Food Express';
  restaurantSubCategoryForm: FormGroup;

  submitted: boolean = false;
  successMsg: string;
  errorMsg: any;
  categories: any;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    this.restaurantSubCategoryForm = this.fb.group({
      sub_name: [null],
      sub_description: [null],
      id_product_cat_fk: [null],
      sub_status: [null],
      icon: [null]
    });

    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  submit() {
    this.submitted = true;
    console.log(this.restaurantSubCategoryForm.value);
    var SubcategoryName = this.restaurantSubCategoryForm.value.sub_name;
    var SubcategoryDescription = this.restaurantSubCategoryForm.value.sub_description;
    var SubcategoryStatus = +this.restaurantSubCategoryForm.value.sub_status;
    var id_product_cat = +this.restaurantSubCategoryForm.value.id_product_cat_fk;

    const newSubCat = {
      sub_name: SubcategoryName,
      sub_description: SubcategoryDescription,
      sub_status: SubcategoryStatus,
      id_product_cat_fk: id_product_cat,
    };

    console.log('body', newSubCat);
    this.productService.addNewSubCategory(newSubCat).subscribe(
      (data) => {
        //console.log("From server", data)
        this.toast.success(`${data.message} `, 'Sub Category saved', {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        });
        this.submitted = false;
        this.ngOnInit();
      },
      (err) => {
        this.toast.error(
          `${err}: Contact Admin is the error persists `,
          'Submission failed',
          {
            timeOut: 3600,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-right',
          }
        );
        this.submitted = false;
      }
    );
  }


  back(){
    this.location.back()
  }
}
