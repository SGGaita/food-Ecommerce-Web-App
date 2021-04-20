import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../_services/restaurants.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyService } from '../_services/currency.service';
import {CurrencyModelServer} from '../_models/currency';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css'],
})
export class RestaurantPageComponent implements OnInit {
  restaurants: [] = [];

  pageTitle="Restaurants | Maungano Food Express"
  public searchText: string;

  serverMsg: string;
  errorMsg: any;
  currency:any;
  iso_code: any;
  conversion_rate: number;

  constructor(private title: Title, private restaurantService: RestaurantsService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)
    this.spinner.show()
    //fetch restaurants
    this.restaurantService.getAllSuppliers().subscribe(
      (sups) => {
        console.log('Restaurants', sups);
        this.restaurants = sups.suppliers.filter(x=>{ return x.status == 1})
        this.spinner.hide()
      },
      (err) =>{
        this.spinner.hide()
        this.errorMsg = err;
      }
    );

    
  }


 

  navigate(_link: any) {}
}
