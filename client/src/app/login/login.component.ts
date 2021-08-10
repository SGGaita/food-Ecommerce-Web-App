import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { SharedService } from '../_services/shared_service/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  message: string;
  dialogState: number
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Login | Maungano Food Express';
  loginForm: FormGroup;
  fieldTextType: boolean;
  submitted: boolean = false;
  successMsg: string;
  errorMsg: any;
  loading = false;
  public loadingMsg = 'Authenticating...Please wait';
  _userData: any;
  _state: number;
  _visible: boolean;

  constructor(
    private title: Title,
    private sharedService: SharedService,
    private custAuthService: CustomerAuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    //public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    
  }

  ngOnInit(): void {
    console.log("")
    this.title.setTitle(this.pageTitle);

    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [null, Validators.required],
    });
  }

  //get form controls
  get f() {
    return this.loginForm.controls;
  }

  //Toggle show password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  //Share user data via shared service
  sendUserData(message: string) {
    this.sharedService.nextCustomerMessage(message);
  }


  //child page toggler
  TogglePage(pageValue: string){
    
    switch(pageValue) {
      case 'register':
        this._visible = true 
        break;
      case 'login':
        this._visible = false
        break;
    }
  }

  //login
  login() {
    this.errorMsg = '';
    this.submitted = true;

    this._state = +localStorage.getItem('stateToken')
    console.log("state value", this._state)

    if (this._state){
      if (this.loginForm.invalid) {
        return;
      }
      this.loading = true;
      this.custAuthService.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
  
          //get and decode token
          let customerToken = this.custAuthService.getToken();
          console.log('Customer token', customerToken);
          var decoded = jwt_decode(customerToken);
          console.log('Decoded token', decoded);
          this.sendUserData(decoded);
          this.successMsg = 'Successful Authentication';
          this.loading = false;
          localStorage.removeItem('stateToken')
          this.router.navigateByUrl('/checkout');
        },
        (err) => {
          this.errorMsg = err.error.reason;
          this.loading = false;
          //console.log('This is error', this.errorMsg);
        }
      );
    } else{
      if (this.loginForm.invalid) {
        return;
      }
      this.loading = true;
      this.custAuthService.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
  
          //get and decode token
          let customerToken = this.custAuthService.getToken();
          console.log('Customer token', customerToken);
          var decoded = jwt_decode(customerToken);
          console.log('Decoded token', decoded);
          this.sendUserData(decoded);
          this.successMsg = 'Successful Authentication';
          this.loading = false;
          this.router.navigateByUrl('/customer/profile');
        },
        (err) => {
          this.errorMsg = err.error.reason;
          this.loading = false;
          console.log('This is error', this.errorMsg);
        }
      );
    }
/** 
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.custAuthService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);

        //get and decode token
        let customerToken = this.custAuthService.getToken();
        console.log('Customer token', customerToken);
        var decoded = jwt_decode(customerToken);
        console.log('Decoded token', decoded);
        this.sendUserData(decoded);
        this.successMsg = 'Successful Authentication';
        this.loading = false;
        this.router.navigateByUrl('/customer/profile');
      },
      (err) => {
        this.errorMsg = err.error.reason;
        this.loading = false;
        console.log('This is error', this.errorMsg);
      }
    );
    */
  }
}
