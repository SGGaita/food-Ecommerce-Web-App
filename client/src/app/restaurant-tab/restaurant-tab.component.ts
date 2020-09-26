import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../_services/restaurants.service'
import {ProductsService} from '../_services/products.service'
import {CartService} from '../_services/cart.service'

@Component({
  selector: 'app-restaurant-tab',
  templateUrl: './restaurant-tab.component.html',
  styleUrls: ['./restaurant-tab.component.css']
})
export class RestaurantTabComponent implements OnInit {
  restaurants: [] =[];
  products: [] = [];

  
  _currency = "CDF"
  serverMsg: string;
  errorMsg: any;
  constructor(private restaurantService: RestaurantsService,
              private productService: ProductsService,
              private cartService: CartService) { }

  ngOnInit() {

    //fetch restaurants
    this.restaurantService.getAllSuppliers()
    .subscribe(sups=>{
       
       console.log("Restaurants", sups)
       this.restaurants = sups.suppliers
      
    },
    err => this.errorMsg = err)

    //fetch products
    this.productService.getProducts()
    .subscribe(prods => {
      this.products = prods.products
    console.log("This products",this.products)
    },
    err => {this.errorMsg = err;
    console.log(this.errorMsg)})
    
  }

  //Add to cart function 
  addToCart(id:number){
    console.log("Added to cart")
    console.log(id)
    this.cartService.AddProductToCart(id)
  }

}
