import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.css']
})
export class MenuMainComponent implements OnInit {

  restaurants: [] =[];
  products: [] = [];

  
  _currency = "CDF"
  serverMsg: string;
  errorMsg: any;

  constructor(private productService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
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
