import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

     //password form
     this.passwordForm = this.formBuilder.group({
      password: [null],
      cpassword: [null],
      npassword: [null],
    });
  }

  submit(){
    
  }

}
