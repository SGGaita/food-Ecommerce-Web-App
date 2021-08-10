import { Component, OnInit } from '@angular/core';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { CustomersModelServer } from '../_models/customers';
import { CustomerService } from '../_services/customer.service';
import { CurrencyService } from '../_services/currency.service';
import { SharedService } from '../_services/shared_service/shared.service';
import {TranslateService} from '@ngx-translate/core'
import jwt_decode from "jwt-decode";
import { CartModelPublic } from '../_models/cart';
import { GeneralSettingsService } from '../_services/general-settings.service';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  customer: CustomersModelServer;
  fname: any;
  customerData: any;
  cart: any;
  _message: string

  store: any = [];
  email: any
  phone:any

  //Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [
      {
        incart: 0,
        id: 0,
      },
    ],
  };

   currency: Object;
  currency_selected: Object;
 
  //languages =[{value:"en",lang:"English"},{value:"fr",lang:"French"}]

  constructor(private generalService: GeneralSettingsService,public translate: TranslateService,public custAuthService: CustomerAuthenticationService, private currencyService: CurrencyService, private customerService: CustomerService) { 
    translate.addLangs(['English','French'])
    translate.setDefaultLang('English')
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|French/) ? browserLang : 'English');
  }

  ngOnInit(): void {

    //fetch store information
    this.generalService.getStoreInfo()
    .subscribe(data =>{
      this.store = data
      this.phone = this.store.map(x=>x.phone).toString()
    })

   
    
    let customerToken = this.custAuthService.getToken()
    var decoded = jwt_decode(customerToken);
    //console.log("Decoded token", decoded);
    this.fname = decoded.fname

    //fetch currencies
    this.currencyService.getAllCurrencies()
    .subscribe(data=>{
      this.currency = data.currencies
      console.log("this currency", this.currency)
      localStorage.setItem('currency', JSON.stringify(data.currencies.filter(x=>{ return x.id_currency == 1})))
    })
 }


 selectCurrency(currency: any){
   console.log("currency id", currency)
  this.currencyService.getAllCurrencies()
  .subscribe(async (data)=>{
    this.currency_selected = await data.currencies.filter(x=>{ return x.id_currency == currency})
    console.log("this currency filtered", this.currency_selected)
    localStorage.setItem('currency',  JSON.stringify(this.currency_selected))
  })
  
 }


 customerLogout(){
  console.log("Some item find")
   //check state of shopping cart
this.custAuthService.logout()

  
 }

  

}
