import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CartService } from '../_services/cart.service';
import { CartModelServer } from '../_models/cart';
import { CustomerAuthenticationService } from '../_auth/customer-authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettingsService } from '../_services/general-settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  _message: string;

  store: any = [];
  logo: any;

  constructor(
    private generalService: GeneralSettingsService,
    private router: Router,
    private cartService: CartService,
    public custAuthService: CustomerAuthenticationService,
    private matDialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    //fetch store information
    this.generalService.getStoreInfo().subscribe((data) => {
      this.store = data;
      this.logo = this.store.map((x) => x.logo).toString();
      //console.log("logo on nav", this.logo)
    });

    this.cartService.cartTotals$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.cartService.cartDataObs$.subscribe((data) => {
      this.cartData = data;
      //console.log("Cart data",this.cartData)
    });
  }

  hasRoute(route: string) {
    if (this.router.url.includes(route)) {
      $('.header-wrapper').removeClass('black');
    } else {
      $('.header-wrapper').addClass('black');
    }
  }

  

  checkout() {
    if (this.custAuthService.isLoggedIn()) {
      this.router.navigateByUrl('/checkout');
    } else {
      //this.openDialog()

      let _state: any = 1;
      localStorage.setItem('stateToken', _state);
      this.router.navigateByUrl('customer/login');
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'logout-modal-component';
    dialogConfig.height = '90%';
    dialogConfig.width = '100%';
    dialogConfig.data = {
      message: 'Login to proceed to checkout',
      dialogState: 1,
    };

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((result) => {
      let data = JSON.parse(result);

      //console.log("Data passed to login", data)
    });
  }
}
