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



import { AppRoutingModule } from './app-routing.module';
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
import { SingleProductComponent } from './single-product/single-product.component';
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
import { OrderDetailsComponent } from './order-details/order-details.component';

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
    SingleProductComponent,
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
    OrderDetailsComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        //useClass: TranslationService,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'French'
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
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
