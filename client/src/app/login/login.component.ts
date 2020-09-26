import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  fieldTextType: boolean;
  successMsg: string;
  errorMsg: any;
  loading = false;
  public loadingMsg = "Authenticating...Please wait";

  constructor(private router: Router,private fb: FormBuilder,private customerAuth: CustomerAuthenticationService) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:[null, Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: [null]
    })


  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  //login
  login(){
    this.loading = true;
    this.errorMsg = ""
    console.log("These values", this.loginForm.value)
    this.customerAuth.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
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
