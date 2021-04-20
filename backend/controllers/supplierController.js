const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');
var multer = require('multer');
var mime = require("mime");


//Get all restaurants
const getAllRestaurants = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('suppliers as s')
        .slice(startValue, endValue)
        .sort({
            status: -1,
            supplier_name: .1
        })
        .getAll()
        .then(sups => {
            if (sups.length > 0) {
                res.status(200).json({
                    count: sups.length,
                    suppliers: sups
                });
            } else {
                res.json({
                    message: "No suppliers found"
                });
            }
        })
        .catch(err => console.log(err));
}
//Get restaurant by Id
const getRestaurantById = (req, res) => {
    let supplierId = req.params.supId;
    database.table('suppliers as s')
        .leftJoin([{
            table: "suppliers_address as a",
            on: `s.id_supplier = a.id_supplier_fk`
        }])
        .filter({
            's.id_supplier': supplierId
        })
        .get()
        .then(sup => {
            console.log(sup);
            if (sup) {
                res.status(200).json(sup);
            } else {
                res.json({
                    message: `No supplier found with id ${supplierId}`
                });
            }
        }).catch(err => res.json(err));
}

//**********************************************/
/*               Restaurant upload                */
//**********************************************/
const fileUpload = (req, res, next) => {

    console.log("req body", req.body)

    //set up disk storage engine and filename
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

    return upload_restaurant.single('image')
    next()
    
}

const addSupplier = (req, res) => {
    let upload = req.upload
    console.log('This upload', upload)
}



const updateSupplier = (req, res) => {
    console.log(req.body)


    database.table('suppliers')
        .filter({
            id_supplier: req.body.id_supplier
        })
        .update({
            status: req.body.status
        }).then(successNum => {
            console.log("rows updated", successNum)
            res.status(200).json(successNum)
        }).catch(err => console.log(err));

}


const updateSupplierStatus = (req, res) => {
    console.log(req.body)


    database.table('suppliers')
        .filter({
            id_supplier: req.body.id_supplier
        })
        .update({
            status: req.body.status
        }).then(successNum => {
            console.log("rows updated", successNum)
            res.status(200).json(successNum)
        }).catch(err => console.log(err));

}

//Delete Supplier
const deleteSupplier = (req, res) => {
    //console.log("body",req.body)
    //console.log("params", req.params)


    database.table('suppliers')
        .filter({
            id_supplier: req.params.id
        })
        .remove()
        .then(successNum => {
            res.json({
                success: true
            })
        }).catch(err => res.json({
            success: false,
            errorMsg: err
        }));

}

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    fileUpload,
    updateSupplier,
    updateSupplierStatus,
    deleteSupplier
};