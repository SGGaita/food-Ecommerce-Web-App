import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductModelServer} from "../_models/products";
import {map} from "rxjs/operators";
import { RestaurantsService } from '../_services/restaurants.service';
import { ProductsService } from '../_services/products.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyService } from '../_services/currency.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  id: any;

  supplier:any
  menu: [] = [];
  pageTitle:string;
  currency: any;
  iso_code: any;
  conversion_rate: number;
  

  constructor(private title: Title, private spinner: NgxSpinnerService,  private route: ActivatedRoute, private restaurantService: RestaurantsService , private productService: ProductsService, private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.spinner.show()

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      //console.log("This restaurant", this.id)
      this.restaurantService.getSingleRestaurant(this.id)
      .subscribe(data=>{
        console.log("this restaurant", data)
        this.supplier = data
        this.title.setTitle(`${this.supplier.supplier_name} Menu | Maungano Food Express`)
        this.spinner.hide()
        
      })
    
    })

   // console.log("Active currency is", this.convertWithCurrencyRate())
  }



   

}
