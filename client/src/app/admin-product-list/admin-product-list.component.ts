import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
})
export class AdminProductListComponent implements OnInit {
  pageTitle = 'Menu list | Maungano Food Express';
  menuItems: any;

  constructor(
    private title: Title,
    private menuService: ProductsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.spinner.show();
    //fetch menu Items
    this.menuService.getProducts().subscribe((data) => { 
      this.menuItems = data.products;
      console.log(`Menu`, this.menuItems);
      this.spinner.hide();
    }, err=>{});
  }

  refresh() {
    this.ngOnInit();
  }
}
