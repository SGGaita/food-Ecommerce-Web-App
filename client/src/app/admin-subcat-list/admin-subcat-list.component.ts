import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-admin-subcat-list',
  templateUrl: './admin-subcat-list.component.html',
  styleUrls: ['./admin-subcat-list.component.css']
})
export class AdminSubcatListComponent implements OnInit {

  pageTitle = "Product Sub Categories | Maungano Food Express"
  header = "Products: Sub Categories"
  subCats: any;
  id: any;

  constructor(private title: Title, private productService: ProductsService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   this.title.setTitle(this.pageTitle)

   this.spinner.show()

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
    this.spinner.hide()
     
 })
  
  })
 }

 refresh(){
  this.ngOnInit()
}



}
