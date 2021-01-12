import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_auth/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  pageTitle= "SYSTEM Admin | Log in"

  loginForm: FormGroup

  submitted: boolean = false;
  successMsg: string;
  errorMsg: any;
  loading = false;
  public loadingMsg = "Authenticating...Please wait";

  constructor(private formbuilder:FormBuilder, private route: ActivatedRoute, private authService: AuthenticationService, private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)
    //initialize form
    this.loginForm = this.formbuilder.group({
      username: [null, Validators.required],
      password:[null, Validators.required]
    })

    
  }

  //get form controls
get f(){
  return this.loginForm.controls;
}


  login(){

    this.errorMsg = ""
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

  this.authService.login(this.loginForm.value).subscribe(data=>{
    console.log("logged in",data);
    this.successMsg = "Successful Authentication";
        this.loading = false;
        this.router.navigate(['../','dashboard'], { relativeTo: this.route });
  }, err => this.errorMsg = err.error.reason)

  }

}
