import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from 'src/app/_auth/customer-authentication.service';
import { CustomerService } from 'src/app/_services/customer.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  pageTitle = 'Customer account overview | Maungano Food Express';
  customerProfileForm: FormGroup;

  userData: any;
  customerProfile: any;
  fname: any;
  lname: any;
  email: any;
  address: any;
  city: any;
  region: any;
  primaryPhone: any;
  secondaryPhone: any;
  additional_info: any;

  updating: boolean = false
  errorMsg: any;
  dob: any;

  constructor(
    private title: Title,
    private customerService: CustomerService,
    public custAuthService: CustomerAuthenticationService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    this.customerProfileForm = this.fb.group({
      fname: [null],
      lname: [null],
      email: [null],
      primaryPhone: [null],
      secondaryPhone: [null],
      dob: [null],
      address: [null],
      city: [null],
      region: [null],
      additional_info: [null]
    });

    //fetch user token and decode
    let customerToken = this.custAuthService.getToken();
    var decoded = jwt_decode(customerToken);
    

    //fetch all customer details
    this.customerService
      .getCustomerById(decoded.id_customer)
      .subscribe((data) => {
        console.log('customer details', data);
        this.customerProfile = data;
        this.fname = this.customerProfile.firstName;
        this.lname = this.customerProfile.lastName;
        this.email = this.customerProfile.email;
        this.address = this.customerProfile.address;
        this.city = this.customerProfile.city;
        this.region = this.customerProfile.region;
        this.primaryPhone = this.customerProfile.primaryPhone;
        this.secondaryPhone = this.customerProfile.secondaryPhone;
        this.additional_info = this.customerProfile.additional_info;
      this.dob = this.customerProfile.dob

      //format date before patching it to date  input element
      const date_of_birth = function formatDate(_date) {
      const d = new Date(_date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }

    console.log("Date of birth", date_of_birth(this.dob) )
        

        this.customerProfileForm.patchValue({
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          primaryPhone: this.primaryPhone,
          secondaryPhone: this.secondaryPhone,
          address: this.address,
          city: this.city,
          region: this.region,
          additional_info: this.additional_info,
          dob: date_of_birth(this.dob)
        });
      });
  }

  submit() {
    this.updating = true
    let customerToken = this.custAuthService.getToken();
    var decoded = jwt_decode(customerToken);

    var fname = this.customerProfileForm.value.fname
    var lname = this.customerProfileForm.value.lname
    var email = this.customerProfileForm.value.email
    var primaryPhone = this.customerProfileForm.value.primaryPhone
    var secondaryPhone = this.customerProfileForm.value.secondaryPhone
    var address = this.customerProfileForm.value.address
    var city = this.customerProfileForm.value.city
    var region = this.customerProfileForm.value.region
    var additional_info = this.customerProfileForm.value.additional_info
    var dob = this.customerProfileForm.value.dob

    const customer = {
      id_customer:decoded.id_customer,
      fname: fname,
      lname:lname,
      email:email,
      primaryPhone:primaryPhone,
      secondaryPhone:secondaryPhone,
      address:address,
      city:city,
      region:region,
      additional_info:additional_info,
      dob: dob
    }

    
    this.customerService.updateCustomer(customer)
    .subscribe(data =>{
      this.toast.success(
        `Customer information details updated`,
        'Information updated',
        {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        }
      );
      this.updating = false
      this.ngOnInit()
    },err =>{
      this.errorMsg = err
    })

  }
}
