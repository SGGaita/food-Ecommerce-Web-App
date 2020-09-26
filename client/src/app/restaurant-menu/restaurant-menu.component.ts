import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductModelServer} from "../_models/products";
import {map} from "rxjs/operators";
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  id: any;

  supplier:any

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      console.log("This restaurant", this.id)
      this.restaurantService.getSingleRestaurant(this.id)
      .subscribe(data=>{
        console.log("this restaurant", data)
        this.supplier = data
      })
    
    })
  }

}
