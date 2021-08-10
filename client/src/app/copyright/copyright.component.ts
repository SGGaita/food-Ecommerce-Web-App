import { Component, OnInit } from '@angular/core';
import {GeneralSettingsService} from '../_services/general-settings.service'

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  date = new Date()
  _year: number;
  
  store: any = [];
  social: any = []
  logo: any;
  store_name: any;
  city:any
  country:any
  phone: any
  email: any

  constructor(private generalService: GeneralSettingsService) { }

  ngOnInit(): void {
    this._year = this.date.getFullYear()

    //fetch store information
    this.generalService.getStoreInfo()
    .subscribe(data =>{
      //console.log('Data', JSON.stringify(data))
      this.store = data
      this.store_name = this.store.map(x=>x.store_name).toString()
      this.city = this.store.map(x=>x.city).toString()
      this.country = this.store.map(x=>x.country).toString()
      this.phone = this.store.map(x=>x.phone).toString()
      this.email = this.store.map(x=>x.email).toString()
      this.logo = this.store.map(x=>x.logo_bw).toString()
    })

    //fetch social information
    this.generalService.getSocialMedia()
    .subscribe(data =>{
      //console.log(`social ${JSON.stringify(data)}`)
      this.social = data
      //console.log("Social media", this.social)
    })
  }

}
