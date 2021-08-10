import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
//import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {NgxPaginationModule} from 'ngx-pagination'; 


import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantTabComponent } from './restaurant-tab/restaurant-tab.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinksCategoriesComponent } from './drinks-categories/drinks-categories.component';
import { DrinksPageComponent } from './drinks-page/drinks-page.component';
import { FoodComponent } from './food/food.component';
import { FoodCategoryComponent } from './food-category/food-category.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';
import { SearchByPipe } from './_filter/search-by.pipe';
import { CustomerComponent } from './customer/customer.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { TopnavComponent } from './topnav/topnav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OrderDetailsComponent } from './account-profile/shared/order-details/order-details.component';
import { MyOrdersComponent } from './account-profile/shared/my-orders/my-orders.component';
import { ChangePasswordComponent } from './account-profile/shared/change-password/change-password.component';
import { AddressBookComponent } from './account-profile/shared/address-book/address-book.component';
import { DetailsEditComponent } from './account-profile/shared/details-edit/details-edit.component';
import { AccountDetailsComponent } from './account-profile/shared/account-details/account-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ThanksRegisterComponent } from './thanks-register/thanks-register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminRestaurantCreateComponent } from './admin-restaurant-create/admin-restaurant-create.component';
import { AdminRestaurantListComponent } from './admin-restaurant-list/admin-restaurant-list.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create.component';
import { AdminCustomerListComponent } from './admin-customer-list/admin-customer-list.component';
import { AdminCustomerAddressesComponent } from './admin-customer-addresses/admin-customer-addresses.component';
import { AdminProductCategoriesComponent } from './admin-product-categories/admin-product-categories.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { TopnavcComponent } from './topnavc/topnavc.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminSubcatListComponent } from './admin-subcat-list/admin-subcat-list.component';
import { AdminRestaurantCategoryListComponent } from './admin-restaurant-category-list/admin-restaurant-category-list.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCatCreateComponent } from './admin-cat-create/admin-cat-create.component';
import { AdminSubcatCreateComponent } from './admin-subcat-create/admin-subcat-create.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminOrderServiceComponent } from './admin-order-service/admin-order-service.component';
import { AdminRestaurantEditComponent } from './admin-restaurant-edit/admin-restaurant-edit.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';


//const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CopyrightComponent,
    NavbarComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantMenuComponent,
    RestaurantTabComponent,
    RestaurantListComponent,
    Navbar2Component,
    CheckoutComponent,
    ThankyouComponent,
    ProductPageComponent,
    CartComponent,
    DrinksComponent,
    DrinksCategoriesComponent,
    DrinksPageComponent,
    FoodComponent,
    FoodCategoryComponent,
    FoodPageComponent,
    RestaurantPageComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    ProductsComponent,
    TermsComponent,
    SearchByPipe,
    CustomerComponent,
    AccountProfileComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    TopnavComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    OrderDetailsComponent,
    MyOrdersComponent,
    ChangePasswordComponent,
    AddressBookComponent,
    DetailsEditComponent,
    AccountDetailsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminRestaurantsComponent,
    AdminProductsComponent,
    AdminCustomersComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    ThanksRegisterComponent,
    EmailVerificationComponent,
    AdminOrderListComponent,
    AdminRestaurantCreateComponent,
    AdminRestaurantListComponent,
    AdminProductListComponent,
    AdminProductCreateComponent,
    AdminCustomerListComponent,
    AdminCustomerAddressesComponent,
    AdminProductCategoriesComponent,
    MenuMainComponent,
    TopnavcComponent,
    AdminCategoryListComponent,
    AdminSubcatListComponent,
    AdminRestaurantCategoryListComponent,
    AdminCategoryComponent,
    AdminCatCreateComponent,
    AdminSubcatCreateComponent,
    DashboardMainComponent,
    AdminUserListComponent,
    AdminUserCreateComponent,
    AdminOrderServiceComponent,
    AdminRestaurantEditComponent,
    GeneralSettingsComponent,
    EmailSettingsComponent,
    PaymentSettingsComponent,
    
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    NoopAnimationsModule,
    SocialLoginModule,
    //SocketIoModule.forRoot(config),
    //AgmCoreModule.forRoot({
      //apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
   // }),
   AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFireAuthModule,
   MatDialogModule,
   NgxSkeletonLoaderModule.forRoot(),
   NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        //useClass: TranslationService,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'English'
    }),
    
    
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'clientId'
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
