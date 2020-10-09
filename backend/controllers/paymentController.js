const express = require('express');
const router = express.Router();
const {database} = require('../db/db_mysqli');

//Get all payment modes
const getAllPaymentModes = (req,res) =>{
    database.table('payment_modes')
       .getAll()
        .then(modes => {
            if (modes.length > 0) {
                res.status(200).json({
                    count: modes.length,
                    modes: modes
                });
            } else {
                res.json({
                    message: "No payment modes found"
                });
            }
        })
        .catch(err => console.log(err));

}

module.exports = {getAllPaymentModes}