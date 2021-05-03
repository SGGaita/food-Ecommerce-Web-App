import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import LocationPicker from 'location-picker';
import { RestaurantsService } from '../_services/restaurants.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr'; 

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-admin-restaurant-create',
  templateUrl: './admin-restaurant-create.component.html',
  styleUrls: ['./admin-restaurant-create.component.css'],
})
export class AdminRestaurantCreateComponent implements OnInit {
  pageTitle = 'New Restaurant | TosEcommerce';
  lp: LocationPicker;

  restaurantForm: FormGroup;

  selectedImage: ImageSnippet;
  imagePreview: string;
  submitted: boolean = false;
  errorMsg: string;
  successMsg: string;
  fileData: File;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private location: Location,
    private restaurantsService: RestaurantsService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toast: ToastrService, 
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    //Initialize map
    //this.lp = new LocationPicker('map');

    //Instantiate form
    this.restaurantForm = this.fb.group({
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
      openTime:[null],
      closeTime:[null],
      geoposition: [null],
    });
  }

  //get form controls
  get f() {
    return this.restaurantForm.controls;
  }

  processImage(imageMenu: any) {
    const file: File = imageMenu.files[0];
    this.fileData = file;
    var fileExtension = '.' + file.name.split('.').pop();

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedImage = event.target.result
    });
    reader.readAsDataURL(file);
  }

  submit() {
    this.submitted = true

    var supplier_name = this.restaurantForm.value.supplier_name;
    var supplier_description = this.restaurantForm.value.supplier_description;
    var status = this.restaurantForm.value.status;
    var email = this.restaurantForm.value.email;
    var address = this.restaurantForm.value.address;
    var city = this.restaurantForm.value.city;
    var zip = this.restaurantForm.value.zip;
    var country = this.restaurantForm.value.country;
    var phone = this.restaurantForm.value.phone;
    var openTime = this.restaurantForm.value.openTime;
    var closeTime = this.restaurantForm.value.closeTime


    const formData = new FormData();

    formData.append('supplier_name', supplier_name);
    formData.append('supplier_description', supplier_description);
    formData.append('status', status);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('zip', zip);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('openTime', openTime);
    formData.append('closeTime', closeTime);
    formData.append('image', this.fileData);

    this.http.post<any>('/api/restaurant/', formData).subscribe(
      res => {
        console.log("data from server", res)
        let message = res.message
        this.toast.success(
          `${message} `,
          'New restaurant saved',
          {
            timeOut: 3600,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          }
        );
        this.submitted = false;
        this.ngOnInit();
      },
      (err) => (this.errorMsg = err)
    );
  }

  back() {
    this.location.back();
  }
}
