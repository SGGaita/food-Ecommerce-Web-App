import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  menuItems: any;

  constructor(private menuService: ProductsService) { }

  ngOnInit(): void {
    //fetch menu Items
    this.menuService.getProducts()
    .subscribe(data=>{
      this.menuItems = data.products;
      console.log(`Menu`, this.menuItems)
    })
  }

}
