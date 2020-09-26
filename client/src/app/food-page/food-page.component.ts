import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  products: [] = [];

  
  _currency = "CDF"
  serverMsg: string;
  errorMsg: any;

  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {

    //fetch products
    this.productService.getProducts()
    .subscribe(prods => {
      this.products = prods.products
    
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
