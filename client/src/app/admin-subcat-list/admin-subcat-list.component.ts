import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-admin-subcat-list',
  templateUrl: './admin-subcat-list.component.html',
  styleUrls: ['./admin-subcat-list.component.css']
})
export class AdminSubcatListComponent implements OnInit {

  pageTitle = "Product Sub Categories | Maungano Admin"
  header = "Products: Sub Categories"
  subCats: any;
  id: any;

  constructor(private title: Title, private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.title.setTitle(this.pageTitle)

   this.route.paramMap.pipe(
    map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id;
    })
  ).subscribe(catId => {
    this.id = catId; 
  

    this.productService.getSubCategoriesById(this.id)
   .subscribe(data =>{
     this.subCats = data;
     console.log("sub cat", this.subCats)
     
 })
  
  })
 }

 refresh(){
  this.ngOnInit()
}



}
