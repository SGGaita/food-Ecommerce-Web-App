import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import {SharedService} from '../_services/shared_service/shared.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  fieldTextType: boolean;
  submitted: boolean = false;
  successMsg: string;
  errorMsg: any;
  loading = false;
  public loadingMsg = "Authenticating...Please wait";
  _userData: any

  constructor(private sharedService: SharedService, private custAuthService: CustomerAuthenticationService, private router: Router,private fb: FormBuilder,private customerAuth: CustomerAuthenticationService) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:[null, [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    })

}

//get form controls
get f(){
  return this.loginForm.controls;
}

//Toggle show password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

 //Share user data via shared service
  sendUserData(user: []) {
    this.sharedService.nextCustomerData(user);
  }


  //login
  login(){
    
    this.errorMsg = ""
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log("These values", this.loginForm.value)
    this.customerAuth.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
        
        //get and decode token
    let customerToken = this.custAuthService.getToken()
    console.log("Customer token", customerToken)
    var decoded = jwt_decode(customerToken);
    console.log("Decode", decoded)
    this.sendUserData(decoded)
        this.successMsg = "Successful Authentication";
        this.loading = false;
        this.router.navigateByUrl('/customer/profile')
      },
      err => {this.errorMsg = err.error.reason;
        this.loading = false;
        console.log("This is error", this.errorMsg)
      })
  }

}
