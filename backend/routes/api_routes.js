//import modules express and router
var express = require('express');
var router = express.Router();
var moment = require('moment');

var currenttime = new moment().format('YYYY-MM-DD HH:mm:ss');
var mysqlConnection = require('../db/db');


//retrieving products
router.get('/restaurants', (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM suppliers', (err, rows,fields)=>{
        if (!err)
        res.json(rows);
        else
        res.json(err);
    })
})

//retrieving products
router.get('/products', (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM product', (err, rows,fields)=>{
        if (!err)
        res.json(rows);
        else
        res.json(err);
    })
})

//retrieving user accounts 
router.get('/user', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

module.exports = router;