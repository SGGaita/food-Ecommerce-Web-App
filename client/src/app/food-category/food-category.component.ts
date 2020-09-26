import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.component.html',
  styleUrls: ['./food-category.component.css']
})
export class FoodCategoryComponent implements OnInit {
  categories: [];
  foodSub: [];
  drinkSub: any;
  

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    //get all categories
    this.productsService.getAllCategories().
    subscribe(data =>{
      this.categories = data;
      console.log("All Categories", this.categories)

    })
    
    //get all food subcategories
    this.productsService.getAllFoodCategories()
    .subscribe(data =>{
      this.foodSub = data;
      console.log("Sub cat", this.foodSub)
    })

    //get all food subcategories
    this.productsService.getAllDrinkCategories()
    .subscribe(data =>{
      this.drinkSub = data;
      
    })

}
}
