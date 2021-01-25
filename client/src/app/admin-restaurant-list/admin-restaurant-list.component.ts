import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-admin-restaurant-list',
  templateUrl: './admin-restaurant-list.component.html',
  styleUrls: ['./admin-restaurant-list.component.css']
})
export class AdminRestaurantListComponent implements OnInit {
  restaurants: any;

  constructor(private restaurantService: RestaurantsService) { 

  }

  ngOnInit(): void {

    //fetch restaurants
    this.restaurantService.getAllSuppliers()
    .subscribe(data=>{
      this.restaurants = data.suppliers
      
    })
  }

}
