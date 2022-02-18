# Food Ordering Web Application
<p>
<p> An online food ordering and delivery web platform. Users can make food orders from listed restaurants and have it delivered to their physical address. </p>
</p>

## Built With

* [ANGULAR 10](https://angular.io/) - Implementation of the Frontend user interfaces across all web platform.
* [Node JS](https://nodejs.org/en/) - Used to implement the backend logic: Serve API routes, application authentication and encryption of the authentication process.
* [MySql](https://dev.mysql.com/doc/) - Database implementation



## Features
* Search option to filter the restaurants
* Shopping cart
* Language translation service using [ngx-translate](https://github.com/ngx-translate/core). Translates between English and French.
* Payment options include Cash payment, M-Pesa(Incomplete), Visa/Master Card(Incomplete) 
## Frontend Walk through
### Homepage
* The landing page has a hero image with a custome welcome text and a link that takes you to the restaurant list page.
* It also has featured Menu list 
<p><img src="screenshots/homepage_english.png" width="50%" /></p>

### Restaurants page
<p>The restaurant page has all the restaurants layed out in a grid format with a filter at the top.</p>
<img src="screenshots/restaurant_list.png" width="80%" />

### Menu page
<img src="screenshots/menu_list.png" width="80%"/>

### Shopping cart
<img src="screenshots/shoppingcart_list.png" width="80%"/>

### Checkout
 <img src="screenshots/checkout.png" width="80%"/>

 ### Customer profile
 <img src="screenshots/customer_profile.png" width="80%"/>

 ## Admin Dashboard 
 <p>The Admin dashboard has panels that allow the administrator and other authorised users to perform specified functions.</p>

 ### Admin login
 <img src="screenshots/admin-login.png" width="80%" />

 ### Order list
 * Through this panel a user can keep track of all orders:  Incoming, dispatched, fullfilled and cancelled orders.
 <img src="screenshots/admin-order-list.png" width="80%"/>

 ### Restaurants Manager

 <img src="screenshots/admin-restaurant-shots.png" width="100%"/>

 ### Menu Manager

 <img src="screenshots/admin-add-menu.png" width="100%"/>

 <img src="screenshots/admin-menu-list.png" width="100%"/>

## Payment Gateways
<img src="https://github.com/SGGaita/food-Ecommerce-Web-App/blob/master/client/src/assets/img/payments.png" weight="30%" />

<p>This application implements the following payments gateways:</p>

* M-PESA - [INCOMPLETE] This is implemented using the [M-Pesa Library for Node JS ](https://github.com/safaricom/mpesa-node-library), that exposes M-Pesa API by Safaricom.
* Stripe - [INCOMPLETE] The Stripe Node library provides convenient access to the [Stripe API](https://github.com/stripe/stripe-node) that allows collecting customer and payment information made using VISA/ Mastercard.


## Mobile platform
*  A [mobile app](https://github.com/SGGaita/food-ordering-app) is currenty under development using [React Native](https://reactnative.dev/docs/getting-started)
  
