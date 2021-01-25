import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../_services/restaurants.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {
  restaurants: [] =[];

  public searchText: string;
  
  serverMsg: string;
  errorMsg: any;

  constructor(private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
    //fetch restaurants
    this.restaurantService.getAllSuppliers()
    .subscribe(sups=>{
       
       console.log("Restaurants", sups)
       this.restaurants = sups.suppliers
      
    },
    err => this.errorMsg = err)
  }

  navigate(_link:any){
    
  }
  }


