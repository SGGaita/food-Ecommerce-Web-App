const express = require('express');
const router = express.Router();
var multer = require('multer');
const {database} = require('../db/db_mysqli');
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
//c. Customer account verification
router.get('/activation/:custID', authenticationController.accountActivationCustomer)


/*####################################################################*/

//2. Customer Endpoints
//a. Get all customers
router.get('/customers', customerController.getAllCustomers);
//b. Get customer infomation
router.get('/customers/:custId',customerController.getCustomerById)


/*####################################################################*/

//3. Product Endpoints
//a. Get all products
router.get ('/products', productsController.getAllProducts)
//b. Get one product by Product ID
router.get ('/products/:prodId', productsController.getProductById)
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

/*####################################################################*/

//4. Supplier Endpoints 
//a. Get all suppliers
router.get('/suppliers', supplierController.getAllRestaurants );
//b. Get supplier by id
router.get('/suppliers/:supId', supplierController.getRestaurantById);

/*####################################################################*/

//5. Order Endpoints
//a. Get distinct by reference
router.get('/orders_distinct', ordersController.getAllDistinctOrders)
//b. Get all orders
router.get('/orders', ordersController.getAllOrders);
//b. Get order by Id
router.get('/orders/:id', ordersController.getOrderById );
//c: Get latest orders by customer id
router.get('/order_latest/:id',ordersController.getLatestOrders)
//d. Add new order
router.post('/orders/new', ordersController.addNewOrder);


/*####################################################################*/

//6. Payment Endpoints
router.get('/payment-modes', paymentController.getAllPaymentModes)
//payment checkot
router.post('/payment', paymentController.paymentGetway)


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
       const filename = prefix + '-' + Date.now()
       callback(null, filename )
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
router.post('/product',upload_product.single('image'), async (req, res) => {
    console.log("request body", req.body)
    console.log("request file", req.file)
    console.log("request filename", req.file.filename)

   console.log("request protocol", req.protocol)
   console.log("request protocol", req.get('host'))
   console.log("Date sent", new Date(req.body.date_of_birth))

 
   database.table( 'product' ) 
   .insert( { 
      id_product_cat_fk:req.body.id_product_cat_fk,
      id_product_sub_cat_fk:req.body.id_product_sub_cat_fk,
      id_supplier_fk:req.body.id_supplier_fk,
      product_name:req.body.product_name,
      product_description: req.body.product_description,
      image: req.file.filename,
      product_price: req.body.product_price,
      status: req.body.status
   } ) 
   . then ( (lastId)  =>  { 
     console.log ( lastId ) 
    // If there is no self-incrementing ID in the table structure, the return value will always be 0 
     res.json({
       message: `Product successfully added ${lastId}`,
       success: true,})
   }).catch(err => {res.json(err);
   console.log("This is the error generated", err)});

}) 

//**********************************************/
/*               Product upload End            */
//**********************************************/

module.exports = router;