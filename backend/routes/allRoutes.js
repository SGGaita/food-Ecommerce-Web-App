const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const supplierController = require('../controllers/supplierController');
const ordersController = require('../controllers/ordersController');
const paymentController = require('../controllers/paymentController');
const authenticationController = require('../controllers/authenticationController');
const customerController = require('../controllers/customerController')

/************************************************/
/*                  Table of Contents           */
/************************************************/
/* 

   1. Authentication Endpoints
    a. Register new system User
    b. Login User
    c. Register new customer
    d. Login Customer 
   2. Product Endpoints *Imported from productsController
    a. Get all Products
    b. Get single product by product id
    c. Get products by category
    d. Get all categories
    e. Get food subcategories
    f. Get drink subcategories
   3. Supplier Endpoints *Imported from supplierController 
    a. Get all Suppliers
    b. Get supplier by Id
   4. Order Endpoints 
   5. Payment Endpoints
*/    

/*####################################################################*/

//1. Authentication Endpoints
// Register new Customer account
router.post('/register', authenticationController.addNewUser);
// Login Customer
router.post('/login', authenticationController.loginUser );
// Register new Customer account
router.post('/register_customer', authenticationController.addNewCustomer);
// Login Customer
router.post('/login_customer', authenticationController.loginCustomer );
//Login Customer
router.post('/login_customer', authenticationController.loginCustomer);

/*####################################################################*/

//2. Product Endpoints
//a. Get all products
router.get ('/products', productsController.getAllProducts)
//b. Get one product by Product ID
router.get ('/products/:prodId', productsController.getProductById)
//c. Get products by category
router.get('/category/:catName', productsController.getProductsByCat)
//d. Get categories
router.get('/categories', productsController.getCategories)
//e. Get subcategories in food category
router.get('/category_food', productsController.getFoodCategories)
//f. Get subcategories in drink category
router.get('/category_drinks', productsController.getDrinkCategories);

/*####################################################################*/

//3. Supplier Endpoints 
//a. Get all suppliers
router.get('/suppliers', supplierController.getAllRestaurants );
//b. Get supplier by id
router.get('/suppliers/:supId', supplierController.getRestaurantById);

/*####################################################################*/

//4. Order Endpoints
//a. Get all orders
router.get('/orders', ordersController.getAllOrders);
//b. Get order by Id
router.get('/order/:id', ordersController.getOrderById );
//c. Add new order
// Place New Order
router.post('/order', ordersController.addNewOrder)

/*####################################################################*/

//5. Payment Endpoints
router.get('/payment-modes', paymentController.getAllPaymentModes)

module.exports = router;