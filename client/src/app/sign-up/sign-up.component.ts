import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms'; 
import {ConfirmPasswordValidator} from '../_helpers/confirm-password.validator'
import {CustomerService} from '../_services/customer.service'
import {CustomerAuthenticationService} from '../_auth/customer-authentication.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  fieldTextType: boolean;



  constructor( private fb: FormBuilder, private customerService: CustomerService, private customerAuthService: CustomerAuthenticationService) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      fname:[null, Validators.required],
      lname: [null, Validators.required],
      //email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      email: [null, Validators.required],
      phone: [null],
      password: [null, Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }

  //get form controls
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.registerForm.value)
     let customer ={
       fname: this.registerForm.value.fname,
       lname: this.registerForm.value.lname,
       email: this.registerForm.value.email,
       phone:this.registerForm.value.phone,
       password: this.registerForm.value.password
     }


     this.customerAuthService.register(customer)
     .subscribe(data =>{
       console.log(data)
     })

    /* this.customerService.sendEmail(user).subscribe(
       data =>{
         let res: any = data;
         console.log(`${user.fname} + ${user.lname} is successfully registered and an email send to email ${user.email}`);
         console.log(res)
       }, err => { console.log(err)})*/
    
  }
Form
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
