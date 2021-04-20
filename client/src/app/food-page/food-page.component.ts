import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { CartService } from '../_services/cart.service';
import { CurrencyService } from '../_services/currency.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  @Input() restaurantId: number

  _currency = "CDF"
  serverMsg: string;
  errorMsg: any;
  menu: any

  public searchText: string;
   public searchCat;
  currency: any;
  iso_code: any;
  conversion_rate: number;

  constructor(private productService: ProductsService, private cartService: CartService,private currencyService: CurrencyService) { }

  ngOnInit(): void {

    //fetch products
    this.productService.getProductsByRestaurant(this.restaurantId)
        .subscribe(data=>{
          this.menu = data.products
          if(data.count >= 1){
            return true
          } else{
            this.errorMsg = true
          }
          
        })
  }

  //Add to cart function 
  addToCart(id:number){
    console.log("Added to cart")
    console.log(id)
    this.cartService.AddProductToCart(id)
  }

  //currency converter
  convertWithCurrencyRate(value: number){
    this.currency  = JSON.parse(this.currencyService.getActiveCurrency())
    this.iso_code = this.currency.map(x=>x.iso_code).toString()
    this.conversion_rate = +this.currency.map(x=>x.conversion_rate)
    //console.log("This typeof",  JSON.parse(this.currency))
   
    if (this.conversion_rate){
     return value * this.conversion_rate
    } 
    return value
 }

 //fetch iso code
 getIsoCode(){
  this.currency  = JSON.parse(this.currencyService.getActiveCurrency())
  this.iso_code = this.currency.map(x=>x.iso_code).toString()
  return this.iso_code
 }

}
