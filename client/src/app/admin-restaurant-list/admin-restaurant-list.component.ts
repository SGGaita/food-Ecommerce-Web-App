import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-admin-restaurant-list',
  templateUrl: './admin-restaurant-list.component.html',
  styleUrls: ['./admin-restaurant-list.component.css'],
})
export class AdminRestaurantListComponent implements OnInit {
  pageTitle = 'Restaurants list | Maungano Food Express';
  restaurants: any;
  searchText: string;
  searchState: string;

  p: number = 1;
  count: any

  constructor(
    private title: Title,
    private restaurantService: RestaurantsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    //fetch restaurants
    this.restaurantService.getAllSuppliers().subscribe((data) => {
      this.restaurants = data.suppliers;
      this.spinner.hide();
    });
  }

  activationUpdate(id: number, status: number) {
    const updateInfo = {
      id_supplier: id,
      status: status,
    };
    console.log(status);
    console.log('Supplier id', id);
    this.restaurantService.updateStatus(updateInfo).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }


  delete(id: number){
    
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.spinner.show();
      this.restaurantService.deleteRestaurant(id)
      .subscribe(data =>{
        console.log("Data",data)
        this.ngOnInit()
        this.spinner.hide();
      },err=>{
        console.log(err)
      })
    }else{
      return
    }
  }

  refresh() {
    this.ngOnInit();
  }
}
