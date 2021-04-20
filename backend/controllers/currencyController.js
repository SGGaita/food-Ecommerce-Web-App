const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');


//Get all payment modes
const getAllCurrency = (req,res) =>{
    database.table('currency')
       .getAll()
        .then(currencies => {
            if (currencies.length > 0) {
                res.json({
                    count: currencies.length,
                    currencies: currencies
                });
            } else {
                res.json({
                    message: "No currencies found"
                });
            }
        })
        .catch(err => console.log(err));

}




module.exports ={getAllCurrency}