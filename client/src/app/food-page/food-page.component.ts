import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { CartService } from '../_services/cart.service';

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

  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {

    //fetch products
    this.productService.getProductsByRestaurant(this.restaurantId)
        .subscribe(data=>{
          this.menu = data.products
          if(data.count > 1){
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

}
