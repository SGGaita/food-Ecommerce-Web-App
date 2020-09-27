import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared_service/shared.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  userData: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.sharedCustomer
    .subscribe(data =>{
      console.log("customer infor", data);
      this.userData = data
      console.log()
    })
  }

}
