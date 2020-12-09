import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared_service/shared.service';

@Component({
  selector: 'app-thanks-register',
  templateUrl: './thanks-register.component.html',
  styleUrls: ['./thanks-register.component.css']
})
export class ThanksRegisterComponent implements OnInit {
  message: {};

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    //Shared message
    this.sharedService.sharedMessage.subscribe(data=>{
      console.log("This message", data)
      this.message = data
    
    })
  }

}
