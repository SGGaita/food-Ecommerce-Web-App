import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { CustomersModelServer } from '../_models/customers';
import { CustomerService } from '../_services/customer.service';
import { SharedService } from '../_services/shared_service/shared.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  customer: CustomersModelServer;
  fname: any;
  customerData: any;

  constructor(private sharedService: SharedService,public auth_cust: CustomerAuthenticationService, private customerService: CustomerService) { }

  ngOnInit(): void {
    
     this.sharedService.sharedCustomer.subscribe(data=>{
       this.customerData = data;
       this.fname = this.customerData.fname
     })
       
  }

  ngOnDestroy(){
    this.sharedService.sharedCustomer.subscribe(data=>{}).unsubscribe
  }

}
