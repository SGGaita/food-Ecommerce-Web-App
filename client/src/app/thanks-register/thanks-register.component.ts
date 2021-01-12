import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../_services/shared_service/shared.service';

@Component({
  selector: 'app-thanks-register',
  templateUrl: './thanks-register.component.html',
  styleUrls: ['./thanks-register.component.css']
})
export class ThanksRegisterComponent implements OnInit {
  message: {};

  constructor(private sharedService: SharedService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //Shared message
    this.sharedService.sharedMessage.subscribe(data=>{
      console.log("This message", data)
      this.message = data

      //this.message ="This message"
      console.log("This message2", this.message)
      let _message_check = Object.keys(this.message).length === 0 && this.message.constructor === Object;

      if (_message_check ){
        this.router.navigate(['../','login'], { relativeTo: this.route })
      }else{
        return true
      }
    
    })
  }

}
