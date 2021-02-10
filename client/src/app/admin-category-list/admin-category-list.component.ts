import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {

  pageTitle = "Product Categories | Maungano Admin"
  categories: any;

  constructor(private productService: ProductsService, private title: Title ) { }

  ngOnInit(): void {
  this.title.setTitle(this.pageTitle);

  this.productService.getAllCategories()
  .subscribe(data =>{
    console.log("Categories",data)
    this.categories = data
  })

  }

  refresh(){
    this.ngOnInit()
  }

}
