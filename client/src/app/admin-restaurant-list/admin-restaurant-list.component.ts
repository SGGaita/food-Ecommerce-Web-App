import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-admin-restaurant-list',
  templateUrl: './admin-restaurant-list.component.html',
  styleUrls: ['./admin-restaurant-list.component.css']
})
export class AdminRestaurantListComponent implements OnInit {
  pageTitle = 'Restaurants list | Maungano Food Express';
  restaurants: any;

  constructor(private title: Title,private restaurantService: RestaurantsService,private spinner: NgxSpinnerService) { 

  }

  ngOnInit(): void {
    this.spinner.show();
    //fetch restaurants
    this.restaurantService.getAllSuppliers()
    .subscribe(data=>{
      this.restaurants = data.suppliers
      this.spinner.hide()
      
    })
  }


  refresh(){
    this.ngOnInit()
  }

}
