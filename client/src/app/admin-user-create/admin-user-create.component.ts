import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../_helpers/confirm-password.validator';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_auth/authentication.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.css'],
})
export class AdminUserCreateComponent implements OnInit {
  pageTitle = 'User account create | Maungano Food Express';

  userAccountForm: FormGroup;
  submitted: boolean;
  errorMessage: any;
  successMessage: string;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private toast: ToastrService
  ) {}



  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    this.userAccountForm = this.fb.group(
      {
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        username: [null, Validators.required],
        //email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        email: [null, Validators.required],
        roles: [null],
        status: [null],
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
      this.toast.success(
        `Account creation success `,
        'User account created',
        {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        }
      );
      this.submitted = false;
      this.ngOnInit()
    }, err =>{
      
      this.toast.error(
        `${err}: Contact Admin is the error persists `, 'Submission failed',
        {
          timeOut: 3600,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-right',
        })
        this.submitted = false
    });
  }

  back() {}

  submit() {}
}
