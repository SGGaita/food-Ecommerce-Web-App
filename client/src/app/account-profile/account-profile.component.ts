import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  userData: any;

  constructor(private sharedService: SharedService, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.sharedService.sharedCustomer
    .subscribe(data =>{
      console.log("customer infor", data);
      this.userData = data
      console.log(this.userData.fname)

      //fetch all customer details
      this.customerService.getCustomerById(this.userData.id_customer)
      .subscribe(data=>{
        console.log("customer details", data)
      })
    })
  }

}
