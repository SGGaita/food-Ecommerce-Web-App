const express = require('express');
const router = express.Router();
var multer = require('multer');
var mime = require("mime");
const {database} = require('../db/db_mysqli');

const productsController = require('../controllers/productsController'); 
const supplierController = require('../controllers/supplierController');
const ordersController = require('../controllers/ordersController');
const paymentController = require('../controllers/paymentController');
const authenticationController = require('../controllers/authenticationController');
const customerController = require('../controllers/customerController');
const userController = require('../controllers/userController')
const emailServerController = require('../controllers/emailServerController');
const currencyController = require('../controllers/currencyController');
const sysConfigController = require('../controllers/sysConfigController')



router.get('/email_order', emailServerController.getEmailOrderVariables)

/************************************************/
/*                  Table of Contents           */
/************************************************/
/* 

   1. Authentication Endpoints
    a. Register new system User
    b. Login User
    c. Register new customer
    d. Login Customer 
   2. User Endpoints
    a. Get all users
    b. Get single user account
   3. Product Endpoints *Imported from productsController
    a. Get all Products
    b. Get single product by product id
    c. Get products by category
    d. Get all categories
    e. Get food subcategories
    f. Get drink subcategories
   4. Supplier Endpoints *Imported from supplierController 
    a. Get all Suppliers
    b. Get supplier by Id
   5. Order Endpoints 
   6. Currency Endpoints
   7. Payment Endpoints
   8. Store information Endpoints
*/

/*####################################################################*/

//1. Authentication Endpoints
// Register new Customer account
router.post('/register', authenticationController.addNewUser);
// Login Customer
router.post('/login', authenticationController.loginUser);
// Register new Customer account
router.post('/register_customer', authenticationController.addNewCustomer);
// Login Customer
router.post('/login_customer', authenticationController.loginCustomer);
//c. Customer account verification
router.get('/activation/:custID', authenticationController.accountActivationCustomer)

/*####################################################################*/
//2. User Endpoints
// Get all users
router.get('/users', userController.getAllUsers);
// Get user by id
router.get('/users/:userId', userController.getUserById);
/*####################################################################*/

//3. Customer Endpoints
//a. Get all customers
router.get('/customers', customerController.getAllCustomers);
//b. Get customer infomation
router.get('/customers/:custId', customerController.getCustomerById)
//c: Update customers information
router.post('/customer',customerController.updateCustomer)


/*####################################################################*/

//3. Product Endpoints
//a. Get all products
router.get('/products', productsController.getAllProducts)
//b. Get one product by Product ID
router.get('/products/:prodId', productsController.getProductById)
// c. Get products by restaurants
router.get('/productsByRest/:restId', productsController.getProductByRestaurant)
//c. Get products by category
router.get('/category/:catName', productsController.getProductsByCat)
//d. Get categories
router.get('/categories', productsController.getCategories)
//d. Get category by id
router.get('/categoryById', productsController.getCategoryByID)
//c. Get category name
//router.get('/subCategories/:catName', productsController.getSubCategoriesByCatName)
//e. Get categories
router.get('/subcategories', productsController.getSubCategories)
//f. Get categories
router.get('/subcategories/:catId', productsController.getSubCategoriesById)
// g. Add new category
router.post('/category/', productsController.addNewCategory)
// g. Add new category
router.post('/sub_category/', productsController.addNewSubCategory)
//f. Get subcategories in food category
router.get('/category_food', productsController.getFoodCategories)
//g. Get subcategories in drink category
router.get('/category_drinks', productsController.getDrinkCategories);
// get all categories and subcategories
router.get('/categories_subcats', productsController.getCategoriesAndSubs)

/*####################################################################*/

//4. Supplier Endpoints 
//a. Get all suppliers
router.get('/suppliers', supplierController.getAllRestaurants);
//b. Get supplier by id
router.get('/suppliers/:supId', supplierController.getRestaurantById);
//supplier status activation
router.post('/activation', supplierController.updateSupplierStatus)
//delete supplier
router.delete('/delete/:id', supplierController.deleteSupplier)

/*####################################################################*/

//5. Order Endpoints
//a. Get distinct by reference
router.get('/orders_distinct', ordersController.getAllDistinctOrders)
//b. Get all orders
router.get('/orders', ordersController.getAllOrders);
//b. Get order by Id
router.get('/orders/:id', ordersController.getOrderById);
//c: Get latest orders by customer id
router.get('/order_latest/:id', ordersController.getLatestOrders)
//d. Add new order
router.post('/orders/new', ordersController.addNewOrder);
//f: cancel order
router.post('/update', ordersController.UpdateOrderState)
//f: cancel order
router.post('/cancel', ordersController.cancelOrder)
//g. get order state
router.get('/order_state', ordersController.getAllOrderStates)


/*####################################################################*/
//6. Currency Endpoints
router.get('/currency', currencyController.getAllCurrency)

/*####################################################################*/

//7. Payment Endpoints
router.get('/payment-modes', paymentController.getAllPaymentModes)
//Mpesa 
router.get('/mpesa',paymentController.mpesaPassword)
//Mpesa STK push
router.post('/mpesa/stk/push', paymentController.mpesaToken, paymentController.mpesaSTKPush)
//payment checkout
router.post('/payment', paymentController.paymentGetway)


//8. Store information Endpoints
router.get('/store', sysConfigController.getStoreInfo)
router.get('/timezone', sysConfigController.getTimezoneInfo)
router.get('/social', sysConfigController.getSocialInfo)


//7. Endpoints with file uploads
//**********************************************/
/*               Product upload                */
//**********************************************/
var storage_product = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../client/src/assets/img/menu');
        //callback(null, './uploads/img/team');
        //Use next line in production change path to ../public/assets/img/...
        //!callback(null, '../client/uploads');
    },
    filename: function (req, file, callback) {
        const prefix = "maungano-menu"
        const filename = prefix + '-' + Date.now() + '.' + mime.getExtension(file.mimetype)
        callback(null, filename)
        //! use next line where no extension
        //callback(null, file.originalname + '.' + mime.getExtension(file.mimetype))
    }
});

//Multer Mime type validation
var upload_product = multer({
    storage: storage_product,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});
router.post('/product', upload_product.single('image'), async (req, res) => {


    database.table('product')
        .insert({
            id_product_cat_fk: req.body.id_product_cat_fk,
            id_product_sub_cat_fk: req.body.id_product_sub_cat_fk,
            id_supplier_fk: req.body.id_supplier_fk,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            image: req.file.filename,
            product_price: req.body.product_price,
            status: req.body.status
        })
        .then((lastId) => {
            
            // If there is no self-incrementing ID in the table structure, the return value will always be 0 
            res.json({
                message: `Product successfully added ${lastId}`,
                success: true,
            })
        }).catch(err => {
            res.json(err);
            console.log("This is the error generated", err)
        });

})

//**********************************************/
/*               Product upload End            */
//**********************************************/

//**********************************************/
/*               Restaurant upload                */
//**********************************************/
var storage_restaurant = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("storage restaurant", req)
        callback(null, '../client/src/assets/img/restaurants');
        //callback(null, './uploads/img/team');
        //Use next line in production change path to ../public/assets/img/...
        //!callback(null, '../client/uploads');
    },
    filename: function (req, file, callback) {
        const prefix = "maungano-rest"
        const filename = prefix + '-' + Date.now() + '.' + mime.getExtension(file.mimetype)
        callback(null, filename)
        //! use next line where no extension
        //callback(null, file.originalname + '.' + mime.getExtension(file.mimetype))
    }
});

//Multer Mime type validation
var upload_restaurant = multer({
    storage: storage_restaurant,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

router.post('/restaurant', upload_restaurant.single('image'), async (req, res) => {
    console.log("whats here",req.body)
    database.table('suppliers')
        .insert({
            supplier_name: req.body.supplier_name,
            supplier_description: req.body.supplier_description,
            supplier_image: req.file.filename,
            status: req.body.status,
            openTime: req.body.openTime,
            closeTime: req.body.closeTime
        })
        .then(async (lastId) => {
            //insert restaurant address
            await database.table('suppliers_address')
                .insert({
                    id_supplier_fk: lastId,
                    email: req.body.email,
                    address: req.body.address,
                    city: req.body.city,
                    zip: req.body.zip,
                    country: req.body.country,
                    phone: req.body.phone
                }).then((lastId) => {
                    res.json({
                        message: `Restaurant successfully added.`,
                        success: true,
                    })
                }).catch(err => {
                    res.json(err);
                }).catch(err => {
                    res.json(err);
                    console.log("This is the error generated", err)
                });
        })
})

module.exports = router;