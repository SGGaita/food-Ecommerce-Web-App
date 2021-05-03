import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RestaurantsService } from '../_services/restaurants.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { SupplierModelServer } from '../_models/restaurants';
import { NgxSpinnerService } from 'ngx-spinner';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-admin-restaurant-edit',
  templateUrl: './admin-restaurant-edit.component.html',
  styleUrls: ['./admin-restaurant-edit.component.css'],
})
export class AdminRestaurantEditComponent implements OnInit {
  pageTitle = 'Update Restaurant | Maungano Food Express';

  restaurantUpdateForm: FormGroup; 

  selectedImage: ImageSnippet;
  imagePreview: string;
  submitted: boolean = false;
  errorMsg: string;
  successMsg: string;
  fileData: File;
  id: any;
  restaurant: any;
  supplier_name: string;
  status: any;
  openTime: any;
  closeTime: any;
  supplier_description: any;
  supplier_image: any;
  email: any;
  address: any;
  city: any;
  zip: any;
  country: any;
  phone: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private title: Title,
    private restaurantsService: RestaurantsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.spinner.show();
    //Instantiate form
    this.restaurantUpdateForm = this.fb.group({
      supplier_name: [null],
      supplier_description: [null],
      supplier_image: [null],
      status: [null],
      email: [null],
      address: [null],
      city: [null],
      zip: [null],
      country: [null],
      phone: [null],
      openTime: [null],
      closeTime: [null],
      geoposition: [null],
      current_image: [null]
    });

    //fetch and patch data to forms
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      )
      .subscribe((suppId) => {
        this.id = suppId;

        this.restaurantsService
          .getSingleRestaurant(this.id)
          .subscribe((data) => {
            this.spinner.hide();
            console.log('This restaurant data', data);
            this.restaurant = data;
            this.supplier_name = this.restaurant.supplier_name;
            this.status = this.restaurant.status;
            this.openTime = this.restaurant.openTime;
            this.closeTime = this.restaurant.closeTime;
            this.email = this.restaurant.email;
            this.address = this.restaurant.address;
            this.city = this.restaurant.city;
            this.zip = this.restaurant.zip;
            this.country = this.restaurant.country;
            this.phone = this.restaurant.phone;
            this.supplier_description = this.restaurant.supplier_description;
            this.supplier_image = this.restaurant.supplier_image;

            
            //patch to form
            this.restaurantUpdateForm.patchValue({
              supplier_name: this.supplier_name,
              email: this.email,
              address: this.address,
              city: this.city,
              zip: this.zip,
              phone: this.phone,
              country: this.country,
              openTime: this.openTime,
              closeTime: this.closeTime,
              supplier_description: this.supplier_description,
            });

          });
      });
  }

  processImage(imageID: any) {
    const file: File = imageID.files[0];
    this.fileData = file;
    var fileExtension = '.' + file.name.split('.').pop();

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedImage = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  back() {
    this.location.back();
  }

  submitUpdate() {
    console.log(this.restaurantUpdateForm.value)
    var supplier_name = this.restaurantUpdateForm.value.supplier_name;
    var supplier_description = this.restaurantUpdateForm.value.supplier_description;
    var status = this.restaurantUpdateForm.value.status;
    var email = this.restaurantUpdateForm.value.email;
    var address = this.restaurantUpdateForm.value.address;
    var city = this.restaurantUpdateForm.value.city;
    var zip = this.restaurantUpdateForm.value.zip;
    var country = this.restaurantUpdateForm.value.country;
    var phone = this.restaurantUpdateForm.value.phone;
    var openTime = this.restaurantUpdateForm.value.openTime;
    var closeTime = this.restaurantUpdateForm.value.closeTime
  }
}
