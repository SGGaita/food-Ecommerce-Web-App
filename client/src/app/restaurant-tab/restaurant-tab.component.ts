import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../_services/restaurants.service'
import {ProductsService} from '../_services/products.service'
import {CartService} from '../_services/cart.service'
import { CurrencyService } from '../_services/currency.service';

@Component({
  selector: 'app-restaurant-tab',
  templateUrl: './restaurant-tab.component.html',
  styleUrls: ['./restaurant-tab.component.css']
})
export class RestaurantTabComponent implements OnInit {
  restaurants: [] =[];
  products: [] = [];

  contentLoadedSups: boolean =false
  contentLoadedProds: boolean =false
  _currency = "CDF"
  serverMsg: string;
  errorMsg: any;
  currency: Object;
  constructor(private restaurantService: RestaurantsService,
              private productService: ProductsService,
              private cartService: CartService,
              private currencyService: CurrencyService) {
                console.log("This selected currency",this.currencyService.getActiveCurrency())
               }

  ngOnInit() {

    //get currency
   

    //fetch restaurants
    this.restaurantService.getAllSuppliers()
    .subscribe(sups=>{
       
       console.log("Restaurants", sups)
       this.restaurants = sups.suppliers.filter(x=>{ return x.status == 1})
       this.contentLoadedSups = true
      
    },
    err => this.errorMsg = err)

    //fetch products
    this.productService.getProducts()
    .subscribe(prods => {
      this.products = prods.products
      this.contentLoadedProds = true
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
