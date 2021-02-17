import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../_helpers/confirm-password.validator';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../_auth/authentication.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.css']
})
export class AdminUserCreateComponent implements OnInit {
  pageTitle ="User account create | Maungano Food Express"

  userAccountForm: FormGroup
  submitted: boolean;
  errorMessage: any;
  successMessage: string;

  constructor(private title : Title, private fb: FormBuilder,private auth: AuthenticationService) { }

  processImage(imageID){

  }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)

    this.userAccountForm = this.fb.group(
      {
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        username: [null, Validators.required],
        //email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        email: [null, Validators.required],
        roles:[null],
        status:[null],
        password: [null, Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    let user = {
      fname: this.userAccountForm.value.fname,
      lname: this.userAccountForm.value.lname,
      email: this.userAccountForm.value.email,
     username: this.userAccountForm.value.username,
      roles: this.userAccountForm.value.roles,
      status: this.userAccountForm.value.status,
      password: this.userAccountForm.value.password,
    };

    this.auth.register(user).subscribe((data) => {
      console.log('Message is of type', typeof data.message);
      if (typeof data.message === 'undefined') {
        console.log('error message', data.error);
        this.errorMessage = data.error;
        this.successMessage = ""
        this.submitted = false
      } else {
        console.log('Message information', data.message);
      
        this.successMessage = "Account has been registered" 
        this.errorMessage = ""
        this.ngOnInit()
        
      }
    });
  }

  back(){

  }

  submit(){

  }

}
