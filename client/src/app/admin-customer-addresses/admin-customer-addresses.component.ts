import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-admin-customer-addresses',
  templateUrl: './admin-customer-addresses.component.html',
  styleUrls: ['./admin-customer-addresses.component.css']
})
export class AdminCustomerAddressesComponent implements OnInit {
  pageTitle ="Customer Addresses | Maungano Food Express"
  count: any;
  customers: any;
  errorMsg: any;

  constructor(private title: Title, 
    private spinner: NgxSpinnerService, 
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)

    this.spinner.show()

    this.customerService.getCustomers()
    .subscribe(data=>{
      console.log(data)
      this.count = data.count
      this.customers = data.customers
      this.spinner.hide()
    }, err =>{
      this.errorMsg = err
      this.spinner.hide()
    })
  }

}
