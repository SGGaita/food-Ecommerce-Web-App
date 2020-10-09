const express = require('express');
const router = express.Router();
const {database} = require('../db/db_mysqli');

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
            id_supplier: .1
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


module.exports = {getAllRestaurants, getRestaurantById};