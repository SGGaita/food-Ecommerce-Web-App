import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../_services/products.service';
import * as $ from 'jquery';
import { RestaurantsService } from '../_services/restaurants.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css'],
})
export class AdminProductCreateComponent implements OnInit {
  pageTitle = 'New Menu | Maungano';
  menuForm: FormGroup;

  selectedImage: ImageSnippet;
  imagePreview: string;
  submitted = false;
  errorMsg: string;
  successMsg: string;
  fileData: File;
  categories: any;
  subCategories: any;
  restaurants: any;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private location: Location,
    private productService: ProductsService,
    private restaurantsService: RestaurantsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //
    //$('.select2').select2();

    //Set page title
    this.title.setTitle(this.pageTitle);

    //Instantiat form
    this.menuForm = this.fb.group({
      id_product_cat_fk: [null],
      id_product_sub_cat_fk: [null],
      id_supplier_fk: [null],
      product_name: [null],
      product_description: [null],
      image: [null],
      product_price: [null],
      status: [null],
    });

    //fetch categories
    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
      //fetch restaurants
      this.restaurantsService.getAllSuppliers()
      .subscribe(data=>{
        this.restaurants = data.suppliers;
        console.log("restaurants", this.restaurants)
      })
    });
  }

  //get form controls
  get f() {
    return this.menuForm.controls;
  }

  processImage(image: any) {
    const file: File = image.files[0];
    this.fileData = file;

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedImage = new ImageSnippet(event.target.result, file); 
    });
    reader.readAsDataURL(file);
  }

  //submit contestant
  save() {
    //console.log('menu',this.menuForm.value.id_product_cat_fk);
    var id_product_cat_fk = this.menuForm.value.id_product_cat_fk;
    var id_product_sub_cat_fk = this.menuForm.value.id_product_sub_cat_fk;
    var id_supplier_fk = this.menuForm.value.id_supplier_fk;
    var product_name = this.menuForm.value.product_name;
    var product_description = this.menuForm.value.product_description;
    var product_price = this.menuForm.value.product_price;
    var status = this.menuForm.value.status;

    
    const formData = new FormData();

    formData.append('id_product_cat_fk', id_product_cat_fk);
    formData.append('id_product_sub_cat_fk',id_product_sub_cat_fk);
    formData.append('id_supplier_fk', id_supplier_fk);
    formData.append('product_name', product_name);
    formData.append('product_description',product_description);
    formData.append('product_price', product_price);
    formData.append('status', status);
    formData.append('image', this.fileData);

    console.log("Form Data", formData)

    this.http
      .post('/api/product/', formData)
      .subscribe((res) => {
          console.log('From server', res);
          //this.successMsg = 'Contestant submit successfully';
          this.ngOnInit();
        },
        (err) => (this.errorMsg = err)
      );
  }

  back() {
    this.location.back();
  }
}
