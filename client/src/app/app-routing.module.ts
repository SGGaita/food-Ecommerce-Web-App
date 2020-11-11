import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthCustGuard } from './_auth/auth-cust.guard';
import { HomeComponent } from './home/home.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FoodComponent } from './food/food.component';
import { DrinksComponent } from './drinks/drinks.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { TermsComponent } from './terms/terms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderDetailsComponent } from './account-profile/shared/order-details/order-details.component';
import { MyOrdersComponent } from './account-profile/shared/my-orders/my-orders.component';
import { AccountDetailsComponent } from './account-profile/shared/account-details/account-details.component';
import { AddressBookComponent } from './account-profile/shared/address-book/address-book.component';
import { ChangePasswordComponent } from './account-profile/shared/change-password/change-password.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'

//Import Auth guards

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: RestaurantListComponent },
      { path: ':id', component: RestaurantMenuComponent },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: ':id',
        component: ProductPageComponent,
      },
    ],
  },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thank-you', component: ThankyouComponent },
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignUpComponent },
      {
        path: 'profile',
        component: AccountProfileComponent,
        children: [
          { path: '', redirectTo: 'my-account', pathMatch: 'full' },
          { path: 'my-account', component: AccountDetailsComponent },
          { path: 'orders', component: MyOrdersComponent },
          { path: 'order-details/:id', component: OrderDetailsComponent },
          { path: 'account-details', component: AccountDetailsComponent },
          { path: 'address-book', component: AddressBookComponent },
          { path: 'password-manager', component: ChangePasswordComponent },
        ],
        canActivate: [AuthCustGuard],
      },
      { path: 'terms', component: TermsComponent },
    ],
  },
  //Start admin section
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login', component: AdminLoginComponent,
        data: { title: 'Administrator login' },
      },
      {path: 'dashboard', component: AdminDashboardComponent}
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
